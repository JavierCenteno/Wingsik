import { FEATURE_TEST_CUBE_SPRITES, FEATURE_TEST_DICE_SPRITES, FEATURE_TEST_SPHERE_SPRITES, FEATURE_TREE_SPRITES } from "../sprites.js";
import { MapElement } from "./map-element.js";
import { ORIENTATION } from "./orientation.js";

export class FeatureType {
    /**
     * Key of this building type for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * How many tiles along the x (west-east) axis features of this type take in their default orientation (north east).
     * @type {number}
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis features of this type take in their default orientation (north east).
     * @type {number}
     */
    sizeY;
    /**
     * How many units along the z (down-up) axis features of this type take.
     * @type {number}
     */
    sizeZ;
    /**
     * Sprites for features of this type.
     * @type {Sprite}
     */
    sprite;

    constructor(key, sizeX, sizeY, sizeZ, sprite) {
        this.key = key;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sizeZ = sizeZ;
        this.sprite = sprite;
    }
}

export const FEATURE_TYPES = {};

FEATURE_TYPES.tree = new FeatureType('tree', 1, 1, 32, FEATURE_TREE_SPRITES);
FEATURE_TYPES.test_cube = new FeatureType('testCube', 1, 1, 18, FEATURE_TEST_CUBE_SPRITES);
FEATURE_TYPES.test_sphere = new FeatureType('testSphere', 1, 1, 18, FEATURE_TEST_SPHERE_SPRITES);
FEATURE_TYPES.test_dice = new FeatureType('testDice', 2, 2, 32, FEATURE_TEST_DICE_SPRITES);

export class Feature extends MapElement {
    /**
     * Type of this feature.
     */
    type;
    /**
     * Location of this feature along the x (west-east) axis. This is a discrete tile index.
     */
    x;
    /**
     * Location of this feature along the y (south-north) axis. This is a discrete tile index.
     */
    y;
    /**
     * Orientation of this feature.
     */
    orientation;

    /**
     * Lowest tile index of the range of tiles occupied by this feature along the x (west-east) axis.
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
     * Highest tile index of the range of tiles occupied by this feature along the x (west-east) axis.
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
     * Lowest tile index of the range of tiles occupied by this feature along the y (south-north) axis.
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
     * Highest tile index of the range of tiles occupied by this feature along the y (south-north) axis.
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
     * @param {Map} map Map where this feature is located
     * @param {BuildingType} type Type of this feature
     * @param {number} x Location of this feature along the x (west-east) axis
     * @param {number} y Location of this feature along the y (south-north) axis
     * @param {GranularOrientation} orientation Orientation of this feature
     */
    constructor(map, type, x, y, orientation) {
        super(map);
        this.type = type;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    tick() {
    }

    getSpriteVariant() {
        return 0;
    }

    /**
     * Checks whether a feature of this type can be built at its location.
     */
    canBeBuilt() {
        // default implementation: simply check whether all the tiles are flat and not occupied
        if (this.map.areTilesOccupied(this.minX, this.maxX, this.minY, this.maxY)) {
            return false;
        }
        for (let j = this.minY; j <= this.maxY; ++j) {
            for (let i = this.minX; i <= this.maxX; ++i) {
                if (!this.map.isTileFlat(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }
}

export class TreeFeature extends Feature {
    constructor(map, x, y, orientation) {
        super(map, FEATURE_TYPES.tree, x, y, orientation)
    }
}

export class TestCubeFeature extends Feature {
    constructor(map, x, y, orientation) {
        super(map, FEATURE_TYPES.test_cube, x, y, orientation)
    }
}

export class TestSphereFeature extends Feature {
    constructor(map, x, y, orientation) {
        super(map, FEATURE_TYPES.test_sphere, x, y, orientation)
    }
}

export class TestDiceFeature extends Feature {
    variant;

    constructor(map, x, y, orientation, variant) {
        super(map, FEATURE_TYPES.test_dice, x, y, orientation);
        this.variant = variant;
    }

    getSpriteVariant() {
        return this.variant;
    }
}
