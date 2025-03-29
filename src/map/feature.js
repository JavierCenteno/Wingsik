import { TREE_SPRITES } from "../sprites.js";

export class FeatureType {
    /**
     * @type {Sprite}
     */
    sprite;

    constructor(sprite) {
        this.sprite = sprite;
    }
}

export const FEATURE_TYPES = {};

FEATURE_TYPES.tree = new FeatureType(TREE_SPRITES);

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
        return this.x;
    }
    get maxX() {
        // features are only one tile wide, so the maximum is the same as the minimum
        return this.x;
    }
    get minY() {
        return this.y;
    }
    get maxY() {
        // features are only one tile wide, so the maximum is the same as the minimum
        return this.y;
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
