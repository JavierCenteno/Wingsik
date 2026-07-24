import { RESOURCE_ALUMINUM_SPRITES, RESOURCE_COAL_SPRITES, RESOURCE_COPPER_SPRITES, RESOURCE_GOLD_SPRITES, RESOURCE_GOLDENPITCH_SPRITES, RESOURCE_IRON_SPRITES, RESOURCE_LEAD_SPRITES, RESOURCE_MERCURY_SPRITES, RESOURCE_PETROLEUM_SPRITES, RESOURCE_SALT_SPRITES, RESOURCE_SILVER_SPRITES, RESOURCE_SULFUR_SPRITES, RESOURCE_TIN_SPRITES, RESOURCE_TUNGSTEN_SPRITES } from "../sprites.js";
import { GOODS } from "./good.js";

export class Resource {
    /**
     * Key of this resource for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * Corresponding good to this resource.
     * @type {Good}
     */
    good;
    /**
     * Sprites for this resource.
     * @type {Sprite}
     */
    sprite;

    constructor(key, good, sprite) {
        this.key = key;
        this.good = good;
        this.sprite = sprite;
    }
}

export const RESOURCES = {};

RESOURCES.aluminum = new Resource('aluminum', GOODS.aluminum, RESOURCE_ALUMINUM_SPRITES);
RESOURCES.coal = new Resource('coal', GOODS.coal, RESOURCE_COAL_SPRITES);
RESOURCES.copper = new Resource('copper', GOODS.copper, RESOURCE_COPPER_SPRITES);
RESOURCES.gold = new Resource('gold', GOODS.gold, RESOURCE_GOLD_SPRITES);
RESOURCES.goldenpitch = new Resource('goldenpitch', GOODS.goldenpitch, RESOURCE_GOLDENPITCH_SPRITES);
RESOURCES.iron = new Resource('iron', GOODS.iron, RESOURCE_IRON_SPRITES);
RESOURCES.lead = new Resource('lead', GOODS.lead, RESOURCE_LEAD_SPRITES);
RESOURCES.mercury = new Resource('mercury', GOODS.mercury, RESOURCE_MERCURY_SPRITES);
RESOURCES.petroleum = new Resource('petroleum', GOODS.petroleum, RESOURCE_PETROLEUM_SPRITES);
RESOURCES.salt = new Resource('salt', GOODS.salt, RESOURCE_SALT_SPRITES);
RESOURCES.silver = new Resource('silver', GOODS.silver, RESOURCE_SILVER_SPRITES);
RESOURCES.sulfur = new Resource('sulfur', GOODS.sulfur, RESOURCE_SULFUR_SPRITES);
RESOURCES.tin = new Resource('tin', GOODS.tin, RESOURCE_TIN_SPRITES);
RESOURCES.tungsten = new Resource('tungsten', GOODS.tungsten, RESOURCE_TUNGSTEN_SPRITES);
