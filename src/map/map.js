export class Map {
    view;
    /**
     * Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     */
    x;
    /**
     * Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     */
    y;
    /**
     * Height of the points at the corners of the tiles as a two dimensional number array with lenghts [y + 1] and [x + 1].
     */
    heights;
    /**
     * List of buildings in this map.
     */
    buildings;
    /**
     * List of tile features in this map.
     */
    features;

    /**
     * 
     * @param {number} x Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     * @param {number} y Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     */
    constructor(view, x, y) {
        this.view = view;
        this.x = x;
        this.y = y;
        // initialize heights to a bidimensional array of dimensions (x + 1), (y + 1)
        this.heights = [];
        for (let j = 0; j <= y; ++j) {
            this.heights.push([]);
            for (let i = 0; i <= x; ++i) {
                this.heights[j].push(0);
            }
        }
        this.buildings = [];
        this.features = [];
    }

    addFeature(feature) {
        this.features.push(feature);
        this.view.addToView(feature);
    }
}
