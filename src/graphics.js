import { TERRAIN_SPRITES } from "./sprites.js";
import { ORIENTATION } from "./view.js";

// Constants

export const CANVAS = document.querySelector('canvas');

export const CONTEXT = CANVAS.getContext('2d');
CONTEXT.imageSmoothingEnabled = false;

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 16;
export const BLOCK_HEIGHT = 8;

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

const tileCoordinatesToCanvasCoordinates = ([x, y, k], reverseX, reverseY) => {
    const reverseXMultiplier = reverseX ? -1 : 1;
    const reverseYMultiplier = reverseY ? -1 : 1;
    return [
        reverseXMultiplier * (TILE_WIDTH / 2) * (y - reverseXMultiplier * reverseYMultiplier * x),
        reverseYMultiplier * (TILE_HEIGHT / 2) * (y + reverseXMultiplier * reverseYMultiplier * x) - (k * BLOCK_HEIGHT)
    ];
}

export const drawTile = (tileType, [x, y]) => {
    CONTEXT.drawImage(
        TERRAIN_SPRITES,
        tileType * TILE_WIDTH,
        0,
        TILE_WIDTH,
        TILE_HEIGHT + 8,
        x,
        y,
        TILE_WIDTH,
        TILE_HEIGHT + 8
    );
}

export const drawView = (view) => {
    let reverseX = view.orientation === ORIENTATION.SOUTH_EAST || view.orientation === ORIENTATION.NORTH_EAST;
    let reverseY = view.orientation === ORIENTATION.NORTH_WEST || view.orientation === ORIENTATION.NORTH_EAST;
    const centerTileRelativeCanvasCoordinates = tileCoordinatesToCanvasCoordinates(view.centerTile, reverseX, reverseY);
    const canvasCenter = [CANVAS.width / 2, CANVAS.height / 2];
    for(let j = 0; j < view.map.x; ++j) {
        for(let i = 0; i < view.map.y; ++i) {
            const k = Math.min(view.map.heights[j][i], view.map.heights[j][i + 1], view.map.heights[j + 1][i], view.map.heights[j + 1][i + 1]);
            let spriteIndex = 0;
            switch(view.orientation) {
                case ORIENTATION.NORTH_EAST:
                    spriteIndex =
                        1 * (view.map.heights[j + 1][i + 1] - k) +
                        4 * (view.map.heights[j + 1][i] - k) +
                        2 * (view.map.heights[j][i + 1] - k) +
                        8 * (view.map.heights[j][i] - k);
                    break;
                case ORIENTATION.NORTH_WEST:
                    spriteIndex =
                        2 * (view.map.heights[j + 1][i + 1] - k) +
                        1 * (view.map.heights[j + 1][i] - k) +
                        8 * (view.map.heights[j][i + 1] - k) +
                        4 * (view.map.heights[j][i] - k);
                    break;
                case ORIENTATION.SOUTH_EAST:
                    spriteIndex =
                        4 * (view.map.heights[j + 1][i + 1] - k) +
                        8 * (view.map.heights[j + 1][i] - k) +
                        1 * (view.map.heights[j][i + 1] - k) +
                        2 * (view.map.heights[j][i] - k);
                    break;
                case ORIENTATION.SOUTH_WEST:
                    spriteIndex =
                        8 * (view.map.heights[j + 1][i + 1] - k) +
                        2 * (view.map.heights[j + 1][i] - k) +
                        4 * (view.map.heights[j][i + 1] - k) +
                        1 * (view.map.heights[j][i] - k);
                    break;
            }
            const tileCanvasCoordinates = tileCoordinatesToCanvasCoordinates([i, j, k], reverseX, reverseY);
            const tileCanvasLocation = [tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0], tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1]];
            drawTile(spriteIndex, tileCanvasLocation);
        }
    }
}

export const drawFrame = (view) => {
    clear();
    drawView(view);
}
