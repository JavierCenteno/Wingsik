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

/**
 * Draws a sprite to the canvas.
 */
export const drawSprite = (sprite, [fromX, fromY], [fromWidth, fromHeight], [toX, toY], [toWidth, toHeight], clickCoordinates, clickCallback, hoverCoordinates, hoverCallback) => {
    // check whether the sprite has been clicked on if there is a click callback
    if (
        clickCoordinates &&
        clickCallback &&
        // the click is within the bounds of the sprite
        toX <= clickCoordinates[0] &&
        clickCoordinates[0] <= toX + toWidth &&
        toY <= clickCoordinates[1] &&
        clickCoordinates[1] <= toY + toHeight
    ) {
        // RGBA values for the pixel of the sprite that the user clicked on
        const spriteImageDataAtClickLocation =
            sprite.context.getImageData(fromWidth * (clickCoordinates[0] - toX) / toWidth + fromX, fromHeight * (clickCoordinates[1] - toY) / toHeight + fromY, 1, 1).data;
        // alpha channel
        if (spriteImageDataAtClickLocation[3] > 0) {
            clickCallback();
        }
    }
    // check whether the sprite is being hovered over if there is a hover callback
    if (
        hoverCoordinates &&
        hoverCallback &&
        toX <= hoverCoordinates[0] &&
        hoverCoordinates[0] <= toX + toWidth &&
        toY <= hoverCoordinates[1] &&
        hoverCoordinates[1] <= toY + toHeight
    ) {
        // RGBA values for the pixel of the sprite that the user clicked on
        const spriteImageDataAtClickLocation =
            sprite.context.getImageData(fromWidth * (hoverCoordinates[0] - toX) / toWidth + fromX, fromHeight * (hoverCoordinates[1] - toY) / toHeight + fromY, 1, 1).data;
        // alpha channel
        if (spriteImageDataAtClickLocation[3] > 0) {
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
        Math.round(toX),
        Math.round(toY),
        toWidth,
        toHeight
    );
}

export const writeText = (text, [atX, atY], font, fontSize = 1, color = '#000000') => {
    const lines = text.split('\n');
    const fontSizePx = Math.round(fontSize) * 16 * window.devicePixelRatio;
    let accumulator = atY;
    for(const line of lines) {
        CONTEXT.font = `${fontSizePx}px ${font}`;
        CONTEXT.fillStyle = color;
        CONTEXT.textBaseline = 'top';
        CONTEXT.textAlign = 'start';
        CONTEXT.fillText(line, atX, accumulator);
        accumulator += fontSizePx;
    }
}
