import { UNIT_CARGO_SHIP_SPRITES, UNIT_INFANTRY_SPRITES } from "../sprites.js";
import { MapElement } from "./map-element.js";
import { GRANULAR_ORIENTATION, ORIENTATION, relativeGranularOrientation } from "./orientation.js";

export class UnitType {
    /**
     * Key of this building type for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * How many tiles along the x (west-east) axis units of this type take in their default orientation (north).
     * @type {number}
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis units of this type take in their default orientation (north).
     * @type {number}
     */
    sizeY;
    /**
     * How many tiles along the diagonal axis units of this type take in their default orientation (north).
     * @type {number}
     */
    sizeXY;
    /**
     * How many units along the z (down-up) axis units of this type take.
     * @type {number}
     */
    sizeZ;
    /**
     * Sprites for units of this type.
     * @type {Sprite}
     */
    sprite;

    constructor(key, sizeX, sizeY, sizeZ, sprite) {
        this.key = key;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeXY = (sizeX ** 2 / 2) ** 0.5 + (sizeY ** 2 / 2) ** 0.5;
        this.sizeZ = sizeZ;
        this.sprite = sprite;
    }
}

export const UNIT_TYPES = {};

UNIT_TYPES.infantry = new UnitType('infantry', 1, 1, 0, UNIT_INFANTRY_SPRITES);
UNIT_TYPES.cargoShip = new UnitType('cargoShip', 2, 6, 0, UNIT_CARGO_SHIP_SPRITES);

export class Unit extends MapElement {
    /**
     * Type of this unit.
     * @type {UnitType}
     */
    type;
    /**
     * Location of this unit along the x (west-east) axis. This is a continuous tile coordinate.
     * @type {number}
     */
    x;
    /**
     * Location of this unit along the y (south-north) axis. This is a continuous tile coordinate.
     * @type {number}
     */
    y;
    /**
     * Orientation of this unit.
     * @type {GranularOrientation}
     */
    orientation;
    /**
     * Towards which location this unit is going.
     * @type {[number,number]}
     */
    goingTowards;

    /**
     * Lowest tile index of the range of tiles occupied by this unit along the x (west-east) axis.
     */
    get minX() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.floor(this.x - this.type.sizeX / 2);
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.floor(this.x - this.type.sizeY / 2);
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.floor(this.x - this.type.sizeXY / 2);
        }
    }
    /**
     * Highest tile index of the range of tiles occupied by this unit along the x (west-east) axis.
     */
    get maxX() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.ceil(this.x + this.type.sizeX / 2) - 1;
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.ceil(this.x + this.type.sizeY / 2) - 1;
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.ceil(this.x + this.type.sizeXY / 2) - 1;
        }
    }
    /**
     * Lowest tile index of the range of tiles occupied by this unit along the y (south-north) axis.
     */
    get minY() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.floor(this.y - this.type.sizeY / 2);
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.floor(this.y - this.type.sizeX / 2);
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.floor(this.y - this.type.sizeXY / 2);
        }
    }
    /**
     * Highest tile index of the range of tiles occupied by this unit along the y (south-north) axis.
     */
    get maxY() {
        switch (this.orientation) {
            case GRANULAR_ORIENTATION.SOUTH:
            case GRANULAR_ORIENTATION.NORTH:
                return Math.ceil(this.y + this.type.sizeY / 2) - 1;
            case GRANULAR_ORIENTATION.WEST:
            case GRANULAR_ORIENTATION.EAST:
                return Math.ceil(this.y + this.type.sizeX / 2) - 1;
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return Math.ceil(this.y + this.type.sizeXY / 2) - 1;
        }
    }

    /**
     * @param {Map} map Map where this unit is located
     * @param {BuildingType} type Type of this unit
     * @param {number} x Location of this unit along the x (west-east) axis
     * @param {number} y Location of this unit along the y (south-north) axis
     * @param {GranularOrientation} orientation Orientation of this unit
     */
    constructor(map, type, x, y, orientation) {
        super(map);
        this.type = type;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    tick() {
        const unitSpeed = 0.1;
        const squareRootOfHalf = Math.sqrt(1/2);
        if (this.goingTowards) {
            this.orientation = relativeGranularOrientation(this.x, this.y, this.goingTowards[0], this.goingTowards[1], unitSpeed);
            // TODO: minimal pathfinding
            switch (this.orientation) {
                case GRANULAR_ORIENTATION.SOUTH_WEST:
                    this.x -= squareRootOfHalf * unitSpeed;
                    this.y -= squareRootOfHalf * unitSpeed;
                    break;
                case GRANULAR_ORIENTATION.SOUTH:
                    this.y -= unitSpeed;
                    break;
                case GRANULAR_ORIENTATION.SOUTH_EAST:
                    this.x += squareRootOfHalf * unitSpeed;
                    this.y -= squareRootOfHalf * unitSpeed;
                    break;
                case GRANULAR_ORIENTATION.WEST:
                    this.x -= unitSpeed;
                    break;
                case GRANULAR_ORIENTATION.EAST:
                    this.x += unitSpeed;
                    break;
                case GRANULAR_ORIENTATION.NORTH_WEST:
                    this.x -= squareRootOfHalf * unitSpeed;
                    this.y += squareRootOfHalf * unitSpeed;
                    break;
                case GRANULAR_ORIENTATION.NORTH:
                    this.y += unitSpeed;
                    break;
                case GRANULAR_ORIENTATION.NORTH_EAST:
                    this.x += squareRootOfHalf * unitSpeed;
                    this.y += squareRootOfHalf * unitSpeed;
                    break;
            }
            if (
                Math.abs(this.x - this.goingTowards[0]) <= (unitSpeed / 2) &&
                Math.abs(this.y - this.goingTowards[1]) <= (unitSpeed / 2)
            ) {
                this.x = this.goingTowards[0];
                this.y = this.goingTowards[1];
                this.goingTowards = undefined;
            }
        }
    }

    getSpriteVariant() {
        return 0;
    }
}

export class InfantryUnit extends Unit {
    constructor(map, x, y, orientation) {
        super(map, UNIT_TYPES.infantry, x, y, orientation)
    }
}

export class CargoShipUnit extends Unit {
    constructor(map, x, y, orientation) {
        super(map, UNIT_TYPES.cargoShip, x, y, orientation)
    }
}
