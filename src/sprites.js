/**
 * Given an image element, returns a promise that resolves when an image is loaded or fails to load.
 */
const imageLoadPromise = (image) => {
    return new Promise(res => {
        if (image.complete || image.naturalWidth !== 0) {
            return res();
        }
        image.onload = () => res();
        image.onerror = () => res();
    });
}

export const TILE_SPRITES = new Image();
TILE_SPRITES.src = "assets/sprites/tile.png";

/**
 * Ensures all sprites are loaded by awaiting their load asynchronously.
 */
export const loadSprites = async () => {
    await imageLoadPromise(TILE_SPRITES);
}
