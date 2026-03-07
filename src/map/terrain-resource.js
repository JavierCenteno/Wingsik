import { RESOURCE_COAL_SPRITES, RESOURCE_IRON_SPRITES } from "../sprites.js";

export class TerrainResource {
    key;

    sprites;

    constructor(key, sprites) {
        this.key = key;
        this.sprites = sprites;
    }
}

export const TERRAIN_RESOURCES = {};

TERRAIN_RESOURCES.coal = new TerrainResource('coal', RESOURCE_COAL_SPRITES);
TERRAIN_RESOURCES.iron = new TerrainResource('iron', RESOURCE_IRON_SPRITES);
