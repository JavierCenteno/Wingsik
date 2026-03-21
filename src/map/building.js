import { BUILDING_FARM_SPRITES, BUILDING_MINE_SPRITES, BUILDING_TENEMENT_SPRITES } from "../sprites.js";
import { ORIENTATION } from "./orientation.js";

export class BuildingType {
    /**
     * Key of this building type for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * How many tiles along the x (west-east) axis buildings of this type take in their default orientation (north east).
     * @type {number}
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis buildings of this type take in their default orientation (north east).
     * @type {number}
     */
    sizeY;
    /**
     * Sprites for buildings of this type.
     * @type {Sprite}
     */
    sprite;

    constructor(key, sizeX, sizeY, sprite) {
        this.key = key;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sprite = sprite;
    }
}

export const BUILDING_TYPES = {};

BUILDING_TYPES.farm = new BuildingType('farm', 2, 3, BUILDING_FARM_SPRITES);
BUILDING_TYPES.mine = new BuildingType('mine', 2, 2, BUILDING_MINE_SPRITES);
BUILDING_TYPES.tenement = new BuildingType('tenement', 2, 3, BUILDING_TENEMENT_SPRITES);

export class Building {
    /**
     * Type of this building.
     */
    type;
    /**
     * Location of this building along the x (west-east) axis. This is a discrete tile index.
     */
    x;
    /**
     * Location of this building along the y (south-north) axis. This is a discrete tile index.
     */
    y;
    /**
     * Orientation of this building.
     */
    orientation;
    /**
     * Workers of this building.
     * @type {Pop[]}
     */
    workers = [];
    /**
     * Residents of this building.
     * @type {Pop[]}
     */
    residents = [];

    /**
     * Lowest tile index of the range of tiles occupied by this building along the x (west-east) axis.
     */
    get minX() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.NORTH_WEST:
                return this.x - (this.type.sizeX - 1);
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_EAST:
                return this.x;
        }
    }
    /**
     * Highest tile index of the range of tiles occupied by this building along the x (west-east) axis.
     */
    get maxX() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.NORTH_WEST:
                return this.x;
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_EAST:
                return this.x + (this.type.sizeX - 1);
        }
    }
    /**
     * Lowest tile index of the range of tiles occupied by this building along the y (south-north) axis.
     */
    get minY() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
                return this.y - (this.type.sizeY - 1);
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return this.y;
        }
    }
    /**
     * Highest tile index of the range of tiles occupied by this building along the y (south-north) axis.
     */
    get maxY() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
                return this.y;
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return this.y + (this.type.sizeY - 1);
        }
    }

    /**
     * @param {BuildingType} type 
     * @param {number} x 
     * @param {number} y 
     * @param {Orientation} orientation 
     */
    constructor(type, x, y, orientation) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }
    
    tick() {
    }
}

export class FarmBuilding extends Building {
    constructor(x, y, orientation) {
        super(BUILDING_TYPES.farm, x, y, orientation)
    }
}

export class MineBuilding extends Building {
    constructor(x, y, orientation) {
        super(BUILDING_TYPES.mine, x, y, orientation)
    }
}

export class TenementBuilding extends Building {
    constructor(x, y, orientation) {
        super(BUILDING_TYPES.tenement, x, y, orientation)
    }
}
