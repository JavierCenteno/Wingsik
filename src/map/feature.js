import { FEATURE_ARROW_SPRITES, FEATURE_CHONKY_SQUARE_SPRITES, FEATURE_LONG_ARROW_SPRITES, FEATURE_TREE_SPRITES } from "../sprites.js";

export class FeatureType {
    /**
     * @type {Sprite}
     */
    sprite;
    /**
     * How many tiles along the x (west-east) axis features of this type take in their default orientation (north east).
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis features of this type take in their default orientation (north east).
     */
    sizeY;

    constructor(sprite, sizeX, sizeY) {
        this.sprite = sprite;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }
}

export const FEATURE_TYPES = {};

FEATURE_TYPES.tree = new FeatureType(FEATURE_TREE_SPRITES, 1, 1);
FEATURE_TYPES.arrow = new FeatureType(FEATURE_ARROW_SPRITES, 2, 3);
FEATURE_TYPES.long_arrow = new FeatureType(FEATURE_LONG_ARROW_SPRITES, 2, 5);
FEATURE_TYPES.chonky_square = new FeatureType(FEATURE_CHONKY_SQUARE_SPRITES, 4, 6);

export class Feature {
    /**
     * Type of this feature.
     */
    type;
    /**
     * Location of this feature along the x (west-east) axis.
     */
    x;
    /**
     * Location of this feature along the y (south-north) axis.
     */
    y;
    /**
     * Orientation of this feature.
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

export class TreeFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.tree, x, y, orientation)
    }
}

export class ArrowFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.arrow, x, y, orientation)
    }
}

export class LongArrowFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.long_arrow, x, y, orientation)
    }
}

export class ChonkySquareFeature extends Feature {
    constructor(x, y, orientation) {
        super(FEATURE_TYPES.chonky_square, x, y, orientation)
    }
}
