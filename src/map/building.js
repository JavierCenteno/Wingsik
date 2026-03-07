import { BUILDING_FARM_SPRITES } from "../sprites.js";
import { ORIENTATION } from "../views/map-view.js";

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
}

export class FarmBuilding extends Building {
    constructor(x, y, orientation) {
        super(BUILDING_TYPES.farm, x, y, orientation)
    }
}
