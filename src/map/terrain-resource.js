import { RESOURCE_ALUMINUM_SPRITES, RESOURCE_COAL_SPRITES, RESOURCE_COPPER_SPRITES, RESOURCE_GOLD_SPRITES, RESOURCE_GOLDENPITCH_SPRITES, RESOURCE_IRON_SPRITES, RESOURCE_LEAD_SPRITES, RESOURCE_MERCURY_SPRITES, RESOURCE_PETROLEUM_SPRITES, RESOURCE_SALT_SPRITES, RESOURCE_SILVER_SPRITES, RESOURCE_SULFUR_SPRITES, RESOURCE_TIN_SPRITES, RESOURCE_TUNGSTEN_SPRITES } from "../sprites.js";
import { RESOURCES } from "./resource.js";

export class TerrainResource {
    /**
     * Key of this terrain resource for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * Corresponding resource to this terrain resource.
     * @type {Resource}
     */
    resource;
    /**
     * Sprites for this terrain resource.
     * @type {Sprite}
     */
    sprite;

    constructor(key, resource, sprite) {
        this.key = key;
        this.resource = resource;
        this.sprite = sprite;
    }
}

export const TERRAIN_RESOURCES = {};

TERRAIN_RESOURCES.aluminum = new TerrainResource('aluminum', RESOURCES.aluminum, RESOURCE_ALUMINUM_SPRITES);
TERRAIN_RESOURCES.coal = new TerrainResource('coal', RESOURCES.coal, RESOURCE_COAL_SPRITES);
TERRAIN_RESOURCES.copper = new TerrainResource('copper', RESOURCES.copper, RESOURCE_COPPER_SPRITES);
TERRAIN_RESOURCES.gold = new TerrainResource('gold', RESOURCES.gold, RESOURCE_GOLD_SPRITES);
TERRAIN_RESOURCES.goldenpitch = new TerrainResource('goldenpitch', RESOURCES.goldenpitch, RESOURCE_GOLDENPITCH_SPRITES);
TERRAIN_RESOURCES.iron = new TerrainResource('iron', RESOURCES.iron, RESOURCE_IRON_SPRITES);
TERRAIN_RESOURCES.lead = new TerrainResource('lead', RESOURCES.lead, RESOURCE_LEAD_SPRITES);
TERRAIN_RESOURCES.mercury = new TerrainResource('mercury', RESOURCES.mercury, RESOURCE_MERCURY_SPRITES);
TERRAIN_RESOURCES.petroleum = new TerrainResource('petroleum', RESOURCES.petroleum, RESOURCE_PETROLEUM_SPRITES);
TERRAIN_RESOURCES.salt = new TerrainResource('salt', RESOURCES.salt, RESOURCE_SALT_SPRITES);
TERRAIN_RESOURCES.silver = new TerrainResource('silver', RESOURCES.silver, RESOURCE_SILVER_SPRITES);
TERRAIN_RESOURCES.sulfur = new TerrainResource('sulfur', RESOURCES.sulfur, RESOURCE_SULFUR_SPRITES);
TERRAIN_RESOURCES.tin = new TerrainResource('tin', RESOURCES.tin, RESOURCE_TIN_SPRITES);
TERRAIN_RESOURCES.tungsten = new TerrainResource('tungsten', RESOURCES.tungsten, RESOURCE_TUNGSTEN_SPRITES);
