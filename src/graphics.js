import { clickEvent, hoverEvent } from "./views/events/game-mouse-event.js";

// Constants

export const CANVAS = document.querySelector('#display');

export const CONTEXT = CANVAS.getContext('2d', { willReadFrequently: true });
CONTEXT.imageSmoothingEnabled = false;

// Draw methods

export const resetCanvasSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    CANVAS.width = Math.round(width * pixelRatio);
    CANVAS.height = Math.round(height * pixelRatio);
    CANVAS.style.width = `${width}px`;
    CANVAS.style.height = `${height}px`;
}

resetCanvasSize();

export const clear = () => {
    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

let CLICK_CALLBACK = undefined;
let HOVER_CALLBACK = undefined;

/**
 * Fills an area of the canvas with a color.
 * 
 * @param {string} color
 * @param {[number, number]} toCoords
 * @param {[number, number]} toSize
 * @param {{} | undefined} options
 * @param {() => {}} options.clickEventCallback A function to be called at the end of the frame if this sprite was clicked on above others
 * @param {() => {}} options.clickInstantCallback A function to be called instantly if this sprite was clicked on even if others above may have also been clicked on
 * @param {() => {}} options.hoverEventCallback A function to be called at the end of the frame if this sprite was hovered on above others
 * @param {() => {}} options.hoverInstantCallback A function to be called instantly if this sprite was hovered on even if others above may have also been hovered on
 */
export const drawColor =
    (
        color,
        [toX, toY],
        [toWidth, toHeight],
        options = undefined,
    ) => {
    // check whether the colored area has been clicked on if there is a click callback
    if (
        clickEvent &&
        // the click is within the bounds of the sprite
        toX <= clickEvent.coordinates[0] &&
        clickEvent.coordinates[0] < toX + toWidth &&
        toY <= clickEvent.coordinates[1] &&
        clickEvent.coordinates[1] < toY + toHeight
    ) {
        options?.clickInstantCallback?.();
        CLICK_CALLBACK = options?.clickEventCallback;
    }
    // check whether the colored area is being hovered over if there is a hover callback
    if (
        hoverEvent &&
        toX <= hoverEvent.coordinates[0] &&
        hoverEvent.coordinates[0] < toX + toWidth &&
        toY <= hoverEvent.coordinates[1] &&
        hoverEvent.coordinates[1] < toY + toHeight
    ) {
        options?.hoverInstantCallback?.();
        HOVER_CALLBACK = options?.hoverEventCallback;
    }
    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(toX, toY, toWidth, toHeight);
}

/**
 * Draws a sprite to the canvas.
 *
 * @param {Sprite} sprite
 * @param {[number, number]} fromCoords
 * @param {[number, number]} fromSize
 * @param {[number, number]} toCoords
 * @param {[number, number]} toSize
 * @param {{} | undefined} options
 * @param {string | undefined} options.filter A filter to apply to the image
 * @param {() => {}} options.clickEventCallback A function to be called at the end of the frame if this sprite was clicked on above others
 * @param {() => {}} options.clickInstantCallback A function to be called instantly if this sprite was clicked on even if others above may have also been clicked on
 * @param {() => {}} options.hoverEventCallback A function to be called at the end of the frame if this sprite was hovered on above others
 * @param {() => {}} options.hoverInstantCallback A function to be called instantly if this sprite was hovered on even if others above may have also been hovered on
 */
export const drawSprite =
    (
        sprite,
        [fromX, fromY],
        [fromWidth, fromHeight],
        [toX, toY],
        [toWidth, toHeight],
        options = undefined
    ) => {
    // check whether the sprite has been clicked on if there is a click callback
    if (
        clickEvent &&
        // the click is within the bounds of the sprite
        toX <= clickEvent.coordinates[0] &&
        clickEvent.coordinates[0] < toX + toWidth &&
        toY <= clickEvent.coordinates[1] &&
        clickEvent.coordinates[1] < toY + toHeight
    ) {
        // RGBA values for the pixel of the sprite that the user clicked on
        const spriteImageDataAtClickLocation =
            sprite.context.getImageData(
                    fromWidth * (clickEvent.coordinates[0] - toX) / toWidth + fromX,
                    fromHeight * (clickEvent.coordinates[1] - toY) / toHeight + fromY,
                    1,
                    1
                ).data;
        // alpha channel
        if (spriteImageDataAtClickLocation[3] > 0) {
            options?.clickInstantCallback?.();
            CLICK_CALLBACK = options?.clickEventCallback;
        }
    }
    // check whether the sprite is being hovered over if there is a hover callback
    if (
        hoverEvent &&
        toX <= hoverEvent.coordinates[0] &&
        hoverEvent.coordinates[0] < toX + toWidth &&
        toY <= hoverEvent.coordinates[1] &&
        hoverEvent.coordinates[1] < toY + toHeight
    ) {
        // RGBA values for the pixel of the sprite that the user clicked on
        const spriteImageDataAtClickLocation =
            sprite.context.getImageData(
                    fromWidth * (hoverEvent.coordinates[0] - toX) / toWidth + fromX,
                    fromHeight * (hoverEvent.coordinates[1] - toY) / toHeight + fromY,
                    1,
                    1
                ).data;
        // alpha channel
        if (spriteImageDataAtClickLocation[3] > 0) {
            options?.hoverInstantCallback?.();
            HOVER_CALLBACK = options?.hoverEventCallback;
        }
    }
    if (options?.filter) {
        switch (options.filter) {
            case FILTERS.NONE:
                CONTEXT.filter = 'none';
                break;
            case FILTERS.RED:
                CONTEXT.filter = 'sepia(1) saturate(10) hue-rotate(300deg)';
                break;
            case FILTERS.GREEN:
                CONTEXT.filter = 'sepia(1) saturate(10) hue-rotate(60deg)';
                break;
        }
    }
    CONTEXT.drawImage(
        // use sprite.canvas or sprite.image depending on what's more efficient
        sprite.canvas,
        fromX,
        fromY,
        fromWidth,
        fromHeight,
        Math.round(toX),
        Math.round(toY),
        toWidth,
        toHeight
    );
    CONTEXT.filter = 'none';
}

export const runCallbacks = () => {
    if (clickEvent && CLICK_CALLBACK) {
        CLICK_CALLBACK();
        CLICK_CALLBACK = undefined;
        clickEvent.cancel();
    }
    if (hoverEvent && HOVER_CALLBACK) {
        HOVER_CALLBACK();
        HOVER_CALLBACK = undefined;
        hoverEvent.cancel();
    }
}

export const FILTERS = {
    NONE: 'none',
    RED: 'red',
    GREEN: 'green'
}

export const writeText = (text, [atX, atY], font, fontSize = 1, color = '#000000') => {
    const lines = text.split('\n');
    const fontSizePx = Math.round(fontSize) * 16 * window.devicePixelRatio;
    let accumulator = atY;
    for (const line of lines) {
        CONTEXT.font = `${fontSizePx}px ${font}`;
        CONTEXT.fillStyle = color;
        CONTEXT.textBaseline = 'top';
        CONTEXT.textAlign = 'start';
        CONTEXT.fillText(line, atX, accumulator);
        accumulator += fontSizePx;
    }
}
