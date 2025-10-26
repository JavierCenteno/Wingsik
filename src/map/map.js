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

    isTileOccupied(x, y) {
        return this.buildings.some((b) => b.minX <= x && x <= b.maxX && b.minY <= y && y <= b.maxY) ||
            this.features.some((f) => f.minX <= x && x <= f.maxX && f.minY <= y && y <= f.maxY) ||
            this.units.some((u) => u.minX <= x && x <= u.maxX && u.minY <= y && y <= u.maxY);
    }

    areTilesOccupied(x1, x2, y1, y2) {
        return this.buildings.some((b) =>
                !((b.minX <= x1 && b.maxX <= x2) || (b.minX >= x1 && b.maxX >= x2)) ||
                !((b.minY <= y1 && b.maxY <= y2) || (b.minY >= y1 && b.maxY >= y2))) ||
            this.features.some((f) =>
                !((f.minX <= x1 && f.maxX <= x2) || (f.minX >= x1 && f.maxX >= x2)) ||
                !((f.minY <= y1 && f.maxY <= y2) || (f.minY >= y1 && f.maxY >= y2))) ||
            this.units.some((u) =>
                !((u.minX <= x1 && u.maxX <= x2) || (u.minX >= x1 && u.maxX >= x2)) ||
                !((u.minY <= y1 && u.maxY <= y2) || (u.minY >= y1 && u.maxY >= y2)));
    }

    addBuilding(building) {
        this.buildings.push(building);
        this.view.addToView(building);
    }

    addFeature(feature) {
        this.features.push(feature);
        this.view.addToView(feature);
    }

    addUnit(unit) {
        // this.features.push(feature);
        this.view.addToView(feature);
    }
}
