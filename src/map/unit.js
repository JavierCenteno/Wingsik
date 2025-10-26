import { FEATURE_TEST_CUBE_SPRITES, FEATURE_TEST_DICE_SPRITES, FEATURE_TEST_SPHERE_SPRITES, FEATURE_TREE_SPRITES } from "../sprites.js";
import { ORIENTATION } from "../view.js";

export class UnitType {
    /**
     * @type {Sprite}
     */
    sprite;
    /**
     * How many tiles along the x (west-east) axis units of this type take in their default orientation (north east).
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis units of this type take in their default orientation (north east).
     */
    sizeY;

    constructor(sprite, sizeX, sizeY) {
        this.sprite = sprite;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}

export const UNIT_TYPES = {};

FEATURE_TYPES.infantry = new UnitType(FEATURE_TREE_SPRITES, 1, 1);

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
        return Math.floor(this.x - (this.type.sizeX - 1) / 2);
    }
    get maxX() {
        return Math.ceil(this.x + (this.type.sizeX - 1) / 2);
    }
    get minY() {
        return Math.floor(this.y - (this.type.sizeY - 1) / 2);
    }
    get maxY() {
        return Math.ceil(this.y + (this.type.sizeY - 1) / 2);
    }

    /**
     * @param {FeatureType} type 
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

export class InfantryUnit extends Unit {
    constructor(x, y, orientation) {
        super(UNIT_TYPES.infantry, x, y, orientation)
    }
}
