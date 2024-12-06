export class Map {
    heights;
    x;
    y;

    /**
     * 
     * @param {*} x Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     * @param {*} y Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heights = [];
        for(let j = 0; j < y + 1; ++j) {
            this.heights.push([]);
            for(let i = 0; i < x + 1; ++i) {
                this.heights[j].push(0);
            }
        }
        this.heights[1][1] = 1;
    }
}
