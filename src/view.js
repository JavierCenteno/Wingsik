import { CANVAS, drawSprite } from "./graphics.js";
import { Map } from './map/map.js';
import { TERRAIN_SPRITES } from "./sprites.js";
import { binaryInsert, removeIfExists } from "./util/list-util.js";

export const ORIENTATION = {
    NORTH_EAST: 'NE',
    NORTH_WEST: 'NW',
    SOUTH_EAST: 'SE',
    SOUTH_WEST: 'SW'
}

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 16;
export const BLOCK_HEIGHT = 8;

/**
 * A view of a map.
 */
export class View {
    /**
     * Current map on display.
     */
    map;
    /**
     * Current orientation of the map in the view.
     */
    orientation = ORIENTATION.NORTH_EAST;
    /**
     * In which tile of the map the view is currently centered.
     */
    centerTile = [0, 0, 0];

    zoomLevel = 1;
    /**
     * In which order the objects in the view are rendered for each orientation.
     * 
     * @type { [orientation: ORIENTATION]: Placeable[] }
     */
    renderOrder;

    /**
     * 
     * @param {number} x Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     * @param {number} y Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     */
    constructor(x, y) {
        this.map = new Map(this, x, y);
        this.renderOrder = {};
        this.renderOrder[ORIENTATION.NORTH_EAST] = [];
        this.renderOrder[ORIENTATION.NORTH_WEST] = [];
        this.renderOrder[ORIENTATION.SOUTH_EAST] = [];
        this.renderOrder[ORIENTATION.SOUTH_WEST] = [];
    }

    moveDown(rate = 1) {
        switch(this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.NORTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
          }
    }

    moveUp(rate = 1) {
        switch(this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.NORTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
          }
    }

    moveLeft(rate = 1) {
        switch(this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.NORTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
        }
    }

    moveRight(rate = 1) {
        switch(this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
          case ORIENTATION.NORTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
          case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
          case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
        }
    }

    rotateClockwise() {
        switch(this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.orientation = ORIENTATION.SOUTH_EAST;
                break;
            case ORIENTATION.NORTH_WEST:
                this.orientation = ORIENTATION.NORTH_EAST;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.orientation = ORIENTATION.SOUTH_WEST;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.orientation = ORIENTATION.NORTH_WEST;
                break;
        }
    }

    rotateCounterclockwise() {
        switch(this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.orientation = ORIENTATION.NORTH_WEST;
                break;
            case ORIENTATION.NORTH_WEST:
                this.orientation = ORIENTATION.SOUTH_WEST;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.orientation = ORIENTATION.NORTH_EAST;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.orientation = ORIENTATION.SOUTH_EAST;
                break;
          }
    }

    addToView(placeable) {
        this.renderOrder[ORIENTATION.NORTH_EAST] = binaryInsert(
            this.renderOrder[ORIENTATION.NORTH_EAST],
            placeable,
            RENDER_ORDER_COMPARATOR_NE
        );
        this.renderOrder[ORIENTATION.NORTH_WEST] = binaryInsert(
            this.renderOrder[ORIENTATION.NORTH_WEST],
            placeable,
            RENDER_ORDER_COMPARATOR_NW
        );
        this.renderOrder[ORIENTATION.SOUTH_EAST] = binaryInsert(
            this.renderOrder[ORIENTATION.SOUTH_EAST],
            placeable,
            RENDER_ORDER_COMPARATOR_SE
        );
        this.renderOrder[ORIENTATION.SOUTH_WEST] = binaryInsert(
            this.renderOrder[ORIENTATION.SOUTH_WEST],
            placeable,
            RENDER_ORDER_COMPARATOR_SW
        );
    }

    removeFromView(placeable) {
        removeIfExists(this.renderOrder[ORIENTATION.NORTH_EAST], placeable);
        removeIfExists(this.renderOrder[ORIENTATION.NORTH_WEST], placeable);
        removeIfExists(this.renderOrder[ORIENTATION.SOUTH_EAST], placeable);
        removeIfExists(this.renderOrder[ORIENTATION.SOUTH_WEST], placeable);
    }

    tileCoordinatesToCanvasCoordinates([x, y, k], zoomLevel, reverseX, reverseY) {
        const reverseXMultiplier = reverseX ? -1 : 1;
        const reverseYMultiplier = reverseY ? -1 : 1;
        return [
            zoomLevel * (reverseXMultiplier * (TILE_WIDTH / 2) * (y - reverseXMultiplier * reverseYMultiplier * x)),
            zoomLevel * (reverseYMultiplier * (TILE_HEIGHT / 2) * (y + reverseXMultiplier * reverseYMultiplier * x) - (k * BLOCK_HEIGHT))
        ];
    }

    draw() {
        let reverseX = this.orientation === ORIENTATION.SOUTH_EAST || this.orientation === ORIENTATION.NORTH_EAST;
        let reverseY = this.orientation === ORIENTATION.NORTH_WEST || this.orientation === ORIENTATION.NORTH_EAST;
        const centerTileRelativeCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates(this.centerTile, this.zoomLevel, reverseX, reverseY);
        const canvasCenter = [CANVAS.width / 2, CANVAS.height / 2];
        // render the tiles
        // we start rendering from the top corner in the view
        for(
            let j = reverseY ? this.map.y - 1 : 0;
            reverseY ? j >= 0 : j < this.map.y;
            j += reverseY ? -1 : 1
        ) {
            for(
                let i = reverseX ? this.map.x - 1 : 0;
                reverseX ? i >= 0 : i < this.map.x;
                i += reverseX ? -1 : 1
            ) {
                const k = Math.min(this.map.heights[j][i], this.map.heights[j][i + 1], this.map.heights[j + 1][i], this.map.heights[j + 1][i + 1]);
                let spriteIndex = 0;
                switch(this.orientation) {
                    case ORIENTATION.NORTH_EAST:
                        spriteIndex =
                            1 * (this.map.heights[j + 1][i + 1] - k) +
                            4 * (this.map.heights[j + 1][i] - k) +
                            2 * (this.map.heights[j][i + 1] - k) +
                            8 * (this.map.heights[j][i] - k);
                        break;
                    case ORIENTATION.NORTH_WEST:
                        spriteIndex =
                            2 * (this.map.heights[j + 1][i + 1] - k) +
                            1 * (this.map.heights[j + 1][i] - k) +
                            8 * (this.map.heights[j][i + 1] - k) +
                            4 * (this.map.heights[j][i] - k);
                        break;
                    case ORIENTATION.SOUTH_EAST:
                        spriteIndex =
                            4 * (this.map.heights[j + 1][i + 1] - k) +
                            8 * (this.map.heights[j + 1][i] - k) +
                            1 * (this.map.heights[j][i + 1] - k) +
                            2 * (this.map.heights[j][i] - k);
                        break;
                    case ORIENTATION.SOUTH_WEST:
                        spriteIndex =
                            8 * (this.map.heights[j + 1][i + 1] - k) +
                            2 * (this.map.heights[j + 1][i] - k) +
                            4 * (this.map.heights[j][i + 1] - k) +
                            1 * (this.map.heights[j][i] - k);
                        break;
                }
                const tileCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates([i, j, k], this.zoomLevel, reverseX, reverseY);
                const tileCanvasLocation =
                    [
                        tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0],
                        tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1] - this.zoomLevel * TERRAIN_SPRITES.image.height
                    ];
                drawSprite(
                    TERRAIN_SPRITES,
                    [spriteIndex * TILE_WIDTH, 0],
                    [TILE_WIDTH, TERRAIN_SPRITES.image.height],
                    tileCanvasLocation,
                    [TILE_WIDTH * this.zoomLevel, TERRAIN_SPRITES.image.height * this.zoomLevel],
                    false
                );
            }
        }
        // render the objects in the view
        for(let o of this.renderOrder[this.orientation]) {
            //
            let spriteIndex = 0;
            switch(this.orientation) {
                case ORIENTATION.NORTH_EAST:
                    spriteIndex = 0;
                    break;
                case ORIENTATION.NORTH_WEST:
                    spriteIndex = 1;
                    break;
                case ORIENTATION.SOUTH_EAST:
                    spriteIndex = 3;
                    break;
                case ORIENTATION.SOUTH_WEST:
                    spriteIndex = 2;
                    break;
            }
            const tileCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates([o.x, o.y, this.map.heights[o.x][o.y]], this.zoomLevel, reverseX, reverseY);
            const tileCanvasLocation =
                [
                    tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0],
                    tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1] - this.zoomLevel * o.type.sprite.image.height
                ];
            drawSprite(
                o.type.sprite,
                [spriteIndex * TILE_WIDTH, 0],
                [TILE_WIDTH, o.type.sprite.image.height],
                tileCanvasLocation,
                [TILE_WIDTH * this.zoomLevel, o.type.sprite.image.height * this.zoomLevel],
                false
            );
        }
    }
}

/**
 * Given two placeable objects A and B and assuming that the orientation is north east, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {Placeable} a
 * @param {Placeable} b
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_NE = (a, b) => {
    return (b.maxX < a.minX || b.maxY < a.minY) * -1 + (a.maxX < b.minX || a.maxY < b.minY) * 1;
}

/**
 * Given two placeable objects A and B and assuming that the orientation is north west, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {Placeable} a 
 * @param {Placeable} b 
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_NW = (a, b) => {
    return (a.maxX < b.minX || b.maxY < a.minY) * -1 + (b.maxX < a.minX || a.maxY < b.minY) * 1;
}

/**
 * Given two placeable objects A and B and assuming that the orientation is south east, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {Placeable} a 
 * @param {Placeable} b 
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_SE = (a, b) => {
    return (b.maxX < a.minX || a.maxY < b.minY) * -1 + (a.maxX < b.minX || b.maxY < a.minY) * 1;
}

/**
 * Given two placeable objects A and B and assuming that the orientation is south west, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {Placeable} a 
 * @param {Placeable} b 
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_SW = (a, b) => {
    return (a.maxX < b.minX || a.maxY < b.minY) * -1 + (b.maxX < a.minX || b.maxY < a.minY) * 1;
}
