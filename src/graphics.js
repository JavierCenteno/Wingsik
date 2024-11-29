// Constants

export const CANVAS = document.querySelector('canvas');

export const CONTEXT = CANVAS.getContext('2d');
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

export const drawSprite = (image, [fromX, fromY], [width, height], [toX, toY]) => {
    CONTEXT.drawImage(
        image,
        fromX,
        fromY,
        width,
        height,
        toX,
        toY,
        width,
        height
    );
}
