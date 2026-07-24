export class Good {
    /**
     * Key of this good for dictionary lookups.
     * @type {string}
     */
    key;

    constructor(key) {
        this.key = key;
    }
}

export const GOODS = {};

GOODS.aluminum = new Good('aluminum');
GOODS.coal = new Good('coal');
GOODS.copper = new Good('copper');
GOODS.corn = new Good('corn');
GOODS.gold = new Good('gold');
GOODS.goldenpitch = new Good('goldenpitch');
GOODS.iron = new Good('iron');
GOODS.lead = new Good('lead');
GOODS.mercury = new Good('mercury');
GOODS.petroleum = new Good('petroleum');
GOODS.salt = new Good('salt');
GOODS.silver = new Good('silver');
GOODS.steel = new Good('steel');
GOODS.sulfur = new Good('sulfur');
GOODS.tin = new Good('tin');
GOODS.tungsten = new Good('tungsten');
GOODS.wood = new Good('wood');
