export class Resource {
    /**
     * Key of this resource for dictionary lookups.
     * @type {string}
     */
    key;

    constructor(key) {
        this.key = key;
    }
}

export const RESOURCES = {};

RESOURCES.aluminum = new Resource('aluminum');
RESOURCES.coal = new Resource('coal');
RESOURCES.copper = new Resource('copper');
RESOURCES.gold = new Resource('gold');
RESOURCES.goldenpitch = new Resource('goldenpitch');
RESOURCES.iron = new Resource('iron');
RESOURCES.lead = new Resource('lead');
RESOURCES.mercury = new Resource('mercury');
RESOURCES.petroleum = new Resource('petroleum');
RESOURCES.salt = new Resource('salt');
RESOURCES.silver = new Resource('silver');
RESOURCES.sulfur = new Resource('sulfur');
RESOURCES.tin = new Resource('tin');
RESOURCES.tungsten = new Resource('tungsten');
RESOURCES.wood = new Resource('wood');
