export class Map {
    view;
    /**
     * Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     * @type {number}
     */
    x;
    /**
     * Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     * @type {number}
     */
    y;
    /**
     * Height of the points at the corners of the tiles as a two dimensional number array with lenghts (y + 1) and (x + 1).
     * @type {number[][]}
     */
    heights;
    /**
     * Types of terrain of each tile as a two dimensional number array with lenghts y and x.
     * @type {TerrainType[][]}
     */
    terrain;
    /**
     * Types of resources of each tile as a two dimensional number array with lenghts y and x.
     * @type {TerrainResource[][]}
     */
    resources;
    /**
     * List of buildings in this map.
     * @type {Building[]}
     */
    buildings;
    /**
     * List of tile features in this map.
     * @type {Feature[]}
     */
    features;
    /**
     * List of units in this map.
     * @type {Unit[]}
     */
    units;
    /**
     * List of pops in this map.
     * @type {Pop[]}
     */
    pops;

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
        // initialize terrain and resources to bidimensional arrays of dimensions x, y
        this.terrain = [];
        this.resources = [];
        for (let j = 0; j < y; ++j) {
            this.terrain.push([]);
            this.resources.push([]);
            for (let i = 0; i < x; ++i) {
                this.terrain[j].push(undefined);
                this.resources[j].push(undefined);
            }
        }
        this.buildings = [];
        this.features = [];
        this.units = [];
        this.pops = [];
    }

    tick() {
        for (const building of this.buildings) {
            building.tick();
        }
        for (const feature of this.features) {
            feature.tick();
        }
        for (const unit of this.units) {
            unit.tick();
        }
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

    isTileFlat(x, y) {
        return (this.heights[y][x] === this.heights[y + 1][x]) &&
            (this.heights[y][x] === this.heights[y][x + 1]) &&
            (this.heights[y][x] === this.heights[y + 1][x + 1]);
    }

    terrainAt(x, y) {
        const indexY = y < 0 ? 0 : y >= this.terrain.length ? this.terrain.length - 1 : y;
        const indexX = x < 0 ? 0 : x >= this.terrain[indexY].length ? this.terrain[indexY].length - 1 : x;
        return this.terrain[indexY][indexX];
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
        this.units.push(unit);
        this.view.addToView(unit);
    }
}
