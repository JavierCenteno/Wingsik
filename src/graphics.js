import { TILE_SPRITES } from "./sprites.js";
import { ORIENTATION } from "./view.js";

// Constants

export const CANVAS = document.querySelector('canvas');

export const CONTEXT = CANVAS.getContext('2d');
CONTEXT.imageSmoothingEnabled = false;

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 16;

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

export const drawSprite = (image, [x, y]) => {
    CONTEXT.drawImage(
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

const tileCoordinatesToCanvasCoordinates = ([x, y], reverseX, reverseY) => {
    const reverseXMultiplier = reverseX ? -1 : 1;
    const reverseYMultiplier = reverseY ? -1 : 1;
    return [
        reverseXMultiplier * (TILE_WIDTH / 2) * (y - reverseXMultiplier * reverseYMultiplier * x),
        reverseYMultiplier * (TILE_HEIGHT / 2) * (y + reverseXMultiplier * reverseYMultiplier * x)
    ];
}

export const drawTile = (tileType, [x, y]) => {
    CONTEXT.drawImage(
        TILE_SPRITES,
        tileType * TILE_WIDTH,
        0,
        TILE_WIDTH,
        TILE_HEIGHT,
        x,
        y,
        TILE_WIDTH,
        TILE_HEIGHT
    );
}

export const drawView = (view) => {
    let reverseX = view.orientation === ORIENTATION.SOUTH_EAST || view.orientation === ORIENTATION.NORTH_EAST;
    let reverseY = view.orientation === ORIENTATION.NORTH_WEST || view.orientation === ORIENTATION.NORTH_EAST;
    const centerTileRelativeCanvasCoordinates = tileCoordinatesToCanvasCoordinates(view.centerTile, reverseX, reverseY);
    const canvasCenter = [CANVAS.width / 2, CANVAS.height / 2];
    for(let j = 0; j < view.map.tiles.length; ++j) {
        for(let i = 0; i < view.map.tiles[j].length; ++i) {
            const tileCanvasCoordinates = tileCoordinatesToCanvasCoordinates([i, j], reverseX, reverseY);
            drawTile(2, [tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0], tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1]]);
        }
    }
}

export const drawFrame = (view) => {
    clear();
    drawView(view);
}
