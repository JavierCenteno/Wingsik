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

/**
 * Creates a sprite object from the given image source and optionally adds a canvas object to it.
 * A canvas object should be added if it is needed to access the image data of the sprite.
 */
export const loadSprite = async (source, createCanvas) => {
    const sprite = {};
    sprite.source = source;
    sprite.image = new Image();
    sprite.image.src = source;
    await imageLoadPromise(sprite.image);
    // sprite.bitmap = createImageBitmap(sprite.image);
    if(createCanvas) {
        sprite.canvas = new OffscreenCanvas(sprite.image.width, sprite.image.height);
        sprite.context = sprite.canvas.getContext('2d', { willReadFrequently: true });
        sprite.context.imageSmoothingEnabled = false;
        sprite.context.drawImage(sprite.image, 0, 0);
    }
    return sprite;
}

export const TILE_SPRITES = await loadSprite("assets/sprites/tile.png", true);
export const TERRAIN_SPRITES = await loadSprite("assets/sprites/terrain.png", true);
