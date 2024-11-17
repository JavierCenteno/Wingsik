import { ORIENTATION } from "./graphics.js";

export class Map {
    tiles;
    /**
     * Current orientation of the view.
     */
    orientation = ORIENTATION.NORTH_EAST;
    /**
     * In which tile the view is currently centered.
     */
    centerTile = [0, 0];

    /**
     * 
     * @param {*} x Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     * @param {*} y Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     */
    constructor(x, y) {
        this.tiles = [];
        for(let j = 0; j < y; ++j) {
            this.tiles.push([]);
            for(let i = 0; i < x; ++i) {
                this.tiles[j].push(0);
            }
        }
    }
}
