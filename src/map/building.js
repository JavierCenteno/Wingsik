import { BUILDING_FARM_SPRITES } from "../sprites.js";

export class BuildingType {
    /**
     * @type {Sprite}
     */
    sprite;
    /**
     * How many tiles along the x (west-east) axis buildings of this type take in their default orientation (north east).
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis buildings of this type take in their default orientation (north east).
     */
    sizeY;

    constructor(sprite, sizeX, sizeY) {
        this.sprite = sprite;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}

export const BUILDING_TYPES = {};

BUILDING_TYPES.farm = new BuildingType(BUILDING_FARM_SPRITES, 2, 3);

export class Building {
    /**
     * Type of this building.
     */
    type;
    /**
     * Location of this building along the x (west-east) axis.
     */
    x;
    /**
     * Location of this building along the y (south-north) axis.
     */
    y;
    /**
     * Orientation of this building.
     */
    orientation;

    get minX() {
        // TODO: ACCOUNT FOR ORIENTATION HERE!
        return this.x;
    }
    get maxX() {
        // TODO: ACCOUNT FOR ORIENTATION HERE!
        return this.x + this.type.sizeX - 1;
    }
    get minY() {
        // TODO: ACCOUNT FOR ORIENTATION HERE!
        return this.y;
    }
    get maxY() {
        // TODO: ACCOUNT FOR ORIENTATION HERE!
        return this.x + this.type.sizeY - 1;
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
}

export class FarmBuilding extends Building {
    constructor(x, y, orientation) {
        super(BUILDING_TYPES.farm, x, y, orientation)
    }
}
