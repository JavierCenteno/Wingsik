import { CLICK_CURRENT } from "./input.js";

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
 * @returns Whether the sprite has been clicked on if it's clickable
 */
export const drawSprite = (sprite, [fromX, fromY], [width, height], [toX, toY], clickable) => {
    let hasClickedOnSprite = false;
    // check whether the sprite has been clicked on if it's clickable
    if(
        clickable &&
        CLICK_CURRENT &&
        toX < CLICK_CURRENT[0] &&
        CLICK_CURRENT[0] < toX + width &&
        toY < CLICK_CURRENT[1] &&
        CLICK_CURRENT[1] < toY + height
    ) {
        // RGBA values for the pixel of the sprite that the user clicked on
        const spriteImageDataAtClickLocation =
            sprite.context.getImageData(CLICK_CURRENT[0] - toX + fromX, CLICK_CURRENT[1] - toY + fromY, 1, 1).data;
        // alpha channel
        if(spriteImageDataAtClickLocation[3] > 0) {
            hasClickedOnSprite = true;
        }
    }
    CONTEXT.drawImage(
        // use sprite.canvas or sprite.image depending on what's more efficient
        sprite.canvas,
        fromX,
        fromY,
        width,
        height,
        toX,
        toY,
        width,
        height
    );
    return hasClickedOnSprite;
}
