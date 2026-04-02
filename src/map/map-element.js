/**
 * An object located in a specific part of a map.
 */
export class MapElement {
    /**
     * Map where this element is located.
     * @type {Map}
     */
    map;
    /**
     * Lowest tile index of the range of tiles occupied by this element along the x (west-east) axis.
     */
    get minX() {
        console.error('Unimplemented method');
    }
    /**
     * Highest tile index of the range of tiles occupied by this element along the x (west-east) axis.
     */
    get maxX() {
        console.error('Unimplemented method');
    }
    /**
     * Lowest tile index of the range of tiles occupied by this element along the y (south-north) axis.
     */
    get minY() {
        console.error('Unimplemented method');
    }
    /**
     * Highest tile index of the range of tiles occupied by this element along the y (south-north) axis.
     */
    get maxY() {
        console.error('Unimplemented method');
    }

    /**
     * @param {Map} map Map where this element is located
     */
    constructor(map) {
        this.map = map;
    }

    tick() {}
}
