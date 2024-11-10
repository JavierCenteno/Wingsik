export const canvas = document.querySelector('canvas');

let screenResolution = [window.screen.width, window.screen.height];
canvas.width = screenResolution[0];
canvas.height = screenResolution[1];

export const context = canvas.getContext('2d');
context.imageSmoothingEnabled = false;

const tileWidth = 16;
const tileHeight = 8;
const viewOffset = [80, 0];

const newFrame = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //
}

export const drawSprite = (image, [x, y]) => {
    context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        x,
        y,
        image.width,
        image.height
    );
}

const tileCoordinatesToCanvasCoordinates = ([x, y]) => {
    return [tileWidth * (x - y) + viewOffset[0], tileHeight * (x + y) + viewOffset[1]];
}
