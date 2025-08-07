import { CLICK_CURRENT, CURSOR_CURRENT } from "./input.js";

// Constants

export const CANVAS = document.querySelector('#display');

export const CONTEXT = CANVAS.getContext('2d', { willReadFrequently: true });
CONTEXT.imageSmoothingEnabled = false;

// Draw methods

export const getWindowSize = () => {
    return [window.innerWidth, window.innerHeight]
}

export const setCanvasSize = ([width, height]) => {
    CANVAS.width = width;
    CANVAS.height = height;
}

setCanvasSize(getWindowSize());

export const clear = () => {
    CONTEXT.fillStyle = "#000000";
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

/**
 * Draws a sprite to the canvas.
 */
export const drawSprite = (sprite, [fromX, fromY], [fromWidth, fromHeight], [toX, toY], [toWidth, toHeight], clickCallback, hoverCallback) => {
    // check whether the sprite has been clicked on if there is a click callback
    if(
        clickCallback &&
        CLICK_CURRENT &&
        toX < CLICK_CURRENT[0] &&
        CLICK_CURRENT[0] < toX + toWidth &&
        toY < CLICK_CURRENT[1] &&
        CLICK_CURRENT[1] < toY + toHeight
    ) {
        // RGBA values for the pixel of the sprite that the user clicked on
        const spriteImageDataAtClickLocation =
            sprite.context.getImageData(fromWidth * (CLICK_CURRENT[0] - toX) / toWidth + fromX, fromHeight * (CLICK_CURRENT[1] - toY) / toHeight + fromY, 1, 1).data;
        // alpha channel
        if(spriteImageDataAtClickLocation[3] > 0) {
            clickCallback();
        }
    }
    // check whether the sprite is being hovered over if there is a hover callback
    if(
        hoverCallback &&
        CURSOR_CURRENT &&
        toX < CURSOR_CURRENT[0] &&
        CURSOR_CURRENT[0] < toX + toWidth &&
        toY < CURSOR_CURRENT[1] &&
        CURSOR_CURRENT[1] < toY + toHeight
    ) {
        // RGBA values for the pixel of the sprite that the user clicked on
        const spriteImageDataAtClickLocation =
            sprite.context.getImageData(fromWidth * (CURSOR_CURRENT[0] - toX) / toWidth + fromX, fromHeight * (CURSOR_CURRENT[1] - toY) / toHeight + fromY, 1, 1).data;
        // alpha channel
        if(spriteImageDataAtClickLocation[3] > 0) {
            hoverCallback();
        }
    }
    CONTEXT.drawImage(
        // use sprite.canvas or sprite.image depending on what's more efficient
        sprite.canvas,
        fromX,
        fromY,
        fromWidth,
        fromHeight,
        toX,
        toY,
        toWidth,
        toHeight
    );
}
