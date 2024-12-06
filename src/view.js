import { TERRAIN_SPRITES } from "./sprites.js";
import { CANVAS, drawSprite } from "./graphics.js";

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
    /**
     * In which order the objects in the view are rendered for each orientation.
     */
    renderOrder;

    /**
     * 
     * @param {*} x Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     * @param {*} y Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     */
    constructor(map) {
        this.map = map;
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
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
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
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
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
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
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
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
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

    tileCoordinatesToCanvasCoordinates([x, y, k], reverseX, reverseY) {
        const reverseXMultiplier = reverseX ? -1 : 1;
        const reverseYMultiplier = reverseY ? -1 : 1;
        return [
            reverseXMultiplier * (TILE_WIDTH / 2) * (y - reverseXMultiplier * reverseYMultiplier * x),
            reverseYMultiplier * (TILE_HEIGHT / 2) * (y + reverseXMultiplier * reverseYMultiplier * x) - (k * BLOCK_HEIGHT)
        ];
    }

    drawTile(tileType, [x, y]) {
        return drawSprite(TERRAIN_SPRITES, [tileType * TILE_WIDTH, 0], [TILE_WIDTH, TILE_HEIGHT + 8], [x, y], false);
    }

    draw() {
        let reverseX = this.orientation === ORIENTATION.SOUTH_EAST || this.orientation === ORIENTATION.NORTH_EAST;
        let reverseY = this.orientation === ORIENTATION.NORTH_WEST || this.orientation === ORIENTATION.NORTH_EAST;
        const centerTileRelativeCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates(this.centerTile, reverseX, reverseY);
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
                const tileCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates([i, j, k], reverseX, reverseY);
                const tileCanvasLocation = [tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0], tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1]];
                this.drawTile(spriteIndex, tileCanvasLocation);
            }
        }
    }
}
