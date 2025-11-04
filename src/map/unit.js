import { UNIT_INFANTRY_SPRITES } from "../sprites.js";
import { ORIENTATION, GRANULAR_ORIENTATION } from "../view.js";

export class UnitType {
    /**
     * @type {Sprite}
     */
    sprite;
    /**
     * How many tiles along the x (west-east) axis units of this type take in their default orientation (north).
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis units of this type take in their default orientation (north).
     */
    sizeY;
    /**
     * How many tiles along the diagonal axis units of this type take in their default orientation (north).
     */
    sizeXY;

    constructor(sprite, sizeX, sizeY) {
        this.sprite = sprite;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeXY = (sizeX ** 2 + sizeY ** 2) ** 0.5;
    }
}

export const UNIT_TYPES = {};

UNIT_TYPES.infantry = new UnitType(UNIT_INFANTRY_SPRITES, 1, 1);

export class Unit {
    /**
     * Type of this unit.
     */
    type;
    /**
     * Location of this unit along the x (west-east) axis.
     */
    x;
    /**
     * Location of this unit along the y (south-north) axis.
     */
    y;
    /**
     * Orientation of this unit.
     */
    orientation;

    get minX() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.floor(this.x - (this.type.sizeX - 1) / 2);
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.floor(this.x - (this.type.sizeY - 1) / 2);
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.floor(this.x - (this.type.sizeXY - 1) / 2);
        }
    }
    get maxX() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.ceil(this.x + (this.type.sizeX - 1) / 2);
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.ceil(this.x + (this.type.sizeY - 1) / 2);
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.ceil(this.x + (this.type.sizeXY - 1) / 2);
        }
    }
    get minY() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.floor(this.y - (this.type.sizeY - 1) / 2);
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.floor(this.y - (this.type.sizeX - 1) / 2);
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.floor(this.y - (this.type.sizeXY - 1) / 2);
        }
    }
    get maxY() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.ceil(this.y + (this.type.sizeY - 1) / 2);
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.ceil(this.y + (this.type.sizeX - 1) / 2);
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.ceil(this.y + (this.type.sizeXY - 1) / 2);
        }
    }

    /**
     * @param {FeatureType} type 
     * @param {number} x 
     * @param {number} y 
     * @param {GranularOrientation} orientation 
     */
    constructor(type, x, y, orientation) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }
}

export class InfantryUnit extends Unit {
    constructor(x, y, orientation) {
        super(UNIT_TYPES.infantry, x, y, orientation)
    }
}
