import { RESOURCE_ALUMINUM_SPRITES, RESOURCE_COAL_SPRITES, RESOURCE_COPPER_SPRITES, RESOURCE_GOLD_SPRITES, RESOURCE_GOLDENPITCH_SPRITES, RESOURCE_IRON_SPRITES, RESOURCE_LEAD_SPRITES, RESOURCE_MERCURY_SPRITES, RESOURCE_SALT_SPRITES, RESOURCE_SILVER_SPRITES, RESOURCE_SULFUR_SPRITES, RESOURCE_TIN_SPRITES, RESOURCE_TUNGSTEN_SPRITES } from "../sprites.js";

export class TerrainResource {
    key;

    sprites;

    constructor(key, sprites) {
        this.key = key;
        this.sprites = sprites;
    }
}

export const TERRAIN_RESOURCES = {};

TERRAIN_RESOURCES.aluminum = new TerrainResource('aluminum', RESOURCE_ALUMINUM_SPRITES);
TERRAIN_RESOURCES.coal = new TerrainResource('coal', RESOURCE_COAL_SPRITES);
TERRAIN_RESOURCES.copper = new TerrainResource('copper', RESOURCE_COPPER_SPRITES);
TERRAIN_RESOURCES.gold = new TerrainResource('gold', RESOURCE_GOLD_SPRITES);
TERRAIN_RESOURCES.goldenpitch = new TerrainResource('goldenpitch', RESOURCE_GOLDENPITCH_SPRITES);
TERRAIN_RESOURCES.iron = new TerrainResource('iron', RESOURCE_IRON_SPRITES);
TERRAIN_RESOURCES.lead = new TerrainResource('lead', RESOURCE_LEAD_SPRITES);
TERRAIN_RESOURCES.mercury = new TerrainResource('mercury', RESOURCE_MERCURY_SPRITES);
TERRAIN_RESOURCES.salt = new TerrainResource('salt', RESOURCE_SALT_SPRITES);
TERRAIN_RESOURCES.silver = new TerrainResource('silver', RESOURCE_SILVER_SPRITES);
TERRAIN_RESOURCES.sulfur = new TerrainResource('sulfur', RESOURCE_SULFUR_SPRITES);
TERRAIN_RESOURCES.tin = new TerrainResource('tin', RESOURCE_TIN_SPRITES);
TERRAIN_RESOURCES.tungsten = new TerrainResource('tungsten', RESOURCE_TUNGSTEN_SPRITES);
