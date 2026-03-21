import { FEATURE_TEST_CUBE_SPRITES, FEATURE_TEST_DICE_SPRITES, FEATURE_TEST_SPHERE_SPRITES, FEATURE_TREE_SPRITES } from "../sprites.js";
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
     * Sprites for features of this type.
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

export const FEATURE_TYPES = {};

FEATURE_TYPES.tree = new FeatureType('tree', 1, 1, FEATURE_TREE_SPRITES);
FEATURE_TYPES.test_cube = new FeatureType('testCube', 1, 1, FEATURE_TEST_CUBE_SPRITES);
FEATURE_TYPES.test_sphere = new FeatureType('testSphere', 1, 1, FEATURE_TEST_SPHERE_SPRITES);
FEATURE_TYPES.test_dice = new FeatureType('testDice', 2, 2, FEATURE_TEST_DICE_SPRITES);

export class Feature {
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
    
    tick() {
    }
}

export class TreeFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.tree, x, y, orientation)
    }
}

export class TestCubeFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.test_cube, x, y, orientation)
    }
}

export class TestSphereFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.test_sphere, x, y, orientation)
    }
}

export class TestDiceFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.test_dice, x, y, orientation)
    }
}
