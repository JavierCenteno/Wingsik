import { TERRAIN_CLAY_SPRITES, TERRAIN_GRASS_SPRITES, TERRAIN_SAND_SPRITES, TERRAIN_LIMESTONE_SPRITES, TERRAIN_TAR_SPRITES, TERRAIN_WATER_SPRITES } from "../sprites.js";

export class TerrainType {
    /**
     * Key of this terrain type for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * Sprites for this terrain type.
     * @type {Sprite}
     */
    sprite;

    constructor(key, sprite) {
        this.key = key;
        this.sprite = sprite;
    }
}

export const TERRAIN_TYPES = {};

TERRAIN_TYPES.clay = new TerrainType('clay', TERRAIN_CLAY_SPRITES);
TERRAIN_TYPES.grass = new TerrainType('grass', TERRAIN_GRASS_SPRITES);
TERRAIN_TYPES.limestone = new TerrainType('limestone', TERRAIN_LIMESTONE_SPRITES);
TERRAIN_TYPES.sand = new TerrainType('sand', TERRAIN_SAND_SPRITES);
TERRAIN_TYPES.tar = new TerrainType('water', TERRAIN_TAR_SPRITES);
TERRAIN_TYPES.water = new TerrainType('water', TERRAIN_WATER_SPRITES);