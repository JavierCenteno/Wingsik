import { CONTEXT } from './graphics.js';

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
const loadSprite = async (source, createCanvas) => {
    const sprite = {};
    sprite.source = source;
    sprite.image = new Image();
    sprite.image.src = source;
    await imageLoadPromise(sprite.image);
    // sprite.bitmap = createImageBitmap(sprite.image);
    if (createCanvas) {
        sprite.canvas = new OffscreenCanvas(sprite.image.width, sprite.image.height);
        sprite.context = sprite.canvas.getContext('2d', { willReadFrequently: true });
        sprite.context.imageSmoothingEnabled = false;
        sprite.context.drawImage(sprite.image, 0, 0);
    }
    return sprite;
}

// Terrain sprites
export const TERRAIN_SPRITES = await loadSprite("assets/sprites/tile/terrain.png", true);

export const TERRAIN_CLAY_SPRITES = await loadSprite("assets/sprites/tile/terrain/clay.png", true);
export const TERRAIN_GRASS_SPRITES = await loadSprite("assets/sprites/tile/terrain/grass.png", true);
export const TERRAIN_LIMESTONE_SPRITES = await loadSprite("assets/sprites/tile/terrain/limestone.png", true);
export const TERRAIN_SAND_SPRITES = await loadSprite("assets/sprites/tile/terrain/sand.png", true);
export const TERRAIN_TAR_SPRITES = await loadSprite("assets/sprites/tile/terrain/tar.png", true);
export const TERRAIN_WATER_SPRITES = await loadSprite("assets/sprites/tile/terrain/water.png", true);

export const RESOURCE_ALUMINUM_SPRITES = await loadSprite("assets/sprites/tile/resource/aluminum.png", true);
export const RESOURCE_COAL_SPRITES = await loadSprite("assets/sprites/tile/resource/coal.png", true);
export const RESOURCE_COPPER_SPRITES = await loadSprite("assets/sprites/tile/resource/copper.png", true);
export const RESOURCE_GOLD_SPRITES = await loadSprite("assets/sprites/tile/resource/gold.png", true);
export const RESOURCE_GOLDENPITCH_SPRITES = await loadSprite("assets/sprites/tile/resource/goldenpitch.png", true);
export const RESOURCE_IRON_SPRITES = await loadSprite("assets/sprites/tile/resource/iron.png", true);
export const RESOURCE_LEAD_SPRITES = await loadSprite("assets/sprites/tile/resource/lead.png", true);
export const RESOURCE_MERCURY_SPRITES = await loadSprite("assets/sprites/tile/resource/mercury.png", true);
export const RESOURCE_SALT_SPRITES = await loadSprite("assets/sprites/tile/resource/salt.png", true);
export const RESOURCE_SILVER_SPRITES = await loadSprite("assets/sprites/tile/resource/silver.png", true);
export const RESOURCE_SULFUR_SPRITES = await loadSprite("assets/sprites/tile/resource/sulfur.png", true);
export const RESOURCE_TIN_SPRITES = await loadSprite("assets/sprites/tile/resource/tin.png", true);
export const RESOURCE_TUNGSTEN_SPRITES = await loadSprite("assets/sprites/tile/resource/tungsten.png", true);

// Building sprites
export const BUILDING_FARM_SPRITES = await loadSprite("assets/sprites/building/farm.png", true);

// Feature sprites
export const FEATURE_TREE_SPRITES = await loadSprite("assets/sprites/feature/tree.png", true);
export const FEATURE_TEST_CUBE_SPRITES = await loadSprite("assets/sprites/feature/test_cube.png", true);
export const FEATURE_TEST_SPHERE_SPRITES = await loadSprite("assets/sprites/feature/test_sphere.png", true);
export const FEATURE_TEST_DICE_SPRITES = await loadSprite("assets/sprites/feature/test_dice.png", true);

// Unit sprites
export const UNIT_INFANTRY_SPRITES = await loadSprite("assets/sprites/unit/infantry.png", true);
export const UNIT_CARGO_SHIP_SPRITES = await loadSprite("assets/sprites/unit/cargo_ship.png", true);

// Menu sprites
export const MENU_BUILD_SPRITES = await loadSprite("assets/sprites/menu/build.png", true);

const loadFont = async (name, source) => {
    const font = new FontFace(name, `url(${source})`);
    await font.load().then((font) => {
        document.fonts.add(font);
    });
}
