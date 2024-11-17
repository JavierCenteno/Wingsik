import { TILE_SPRITES } from "./sprites.js";

// Constants

export const CANVAS = document.querySelector('canvas');

let screenResolution = [window.screen.width, window.screen.height];
CANVAS.width = screenResolution[0];
CANVAS.height = screenResolution[1];

export const CONTEXT = CANVAS.getContext('2d');
CONTEXT.imageSmoothingEnabled = false;

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 16;

export const ORIENTATION = {
    NORTH_EAST: 'NE',
    NORTH_WEST: 'NW',
    SOUTH_EAST: 'SE',
    SOUTH_WEST: 'SW'
}

// Draw methods

export const clear = () => {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
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

export const drawMap = (map) => {
    let reverseX = map.orientation === ORIENTATION.SOUTH_EAST || map.orientation === ORIENTATION.NORTH_EAST;
    let reverseY = map.orientation === ORIENTATION.NORTH_WEST || map.orientation === ORIENTATION.NORTH_EAST;
    const centerTileRelativeCanvasCoordinates = tileCoordinatesToCanvasCoordinates(map.centerTile, reverseX, reverseY);
    const canvasCenter = [CANVAS.width / 2, CANVAS.height / 2];
    for(let j = 0; j < map.tiles.length; ++j) {
        for(let i = 0; i < map.tiles[j].length; ++i) {
            const tileCanvasCoordinates = tileCoordinatesToCanvasCoordinates([i, j], reverseX, reverseY);
            drawTile((i + j) % 6, [tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0], tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1]]);
        }
    }
}
