import { removeIfExists } from "../util/list-util";

export class Race {
    /**
     * Key of this race for dictionary lookups.
     * @type {string}
     */
    key;

    constructor(key) {
        this.key = key;
    }
}

export const RACES = {};

RACES.earthPony = new Race('earthPony');
RACES.pegasus = new Race('pegasus');
RACES.unicorn = new Race('unicorn');
RACES.seapony = new Race('seapony');
RACES.lamia = new Race('lamia');
RACES.sphinx = new Race('sphinx');
RACES.zebra = new Race('zebra');
RACES.donkey = new Race('donkey');
RACES.griffon = new Race('griffon');

RACES.kirin = new Race('kirin');
RACES.caribou = new Race('caribou');
RACES.deer = new Race('deer');
RACES.cattle = new Race('cattle');
RACES.buffalo = new Race('buffalo');
RACES.yak = new Race('yak');
RACES.llama = new Race('llama');

RACES.dragon = new Race('dragon');

RACES.changeling = new Race('changeling');

export class Pop {
    /**
     * In what building this pop works if it is employed.
     * @type {Building?}
     */
    workplace;
    /**
     * What occupation this pop has at its workplace if it is employed.
     * @type {Occupation?}
     */
    occupation;
    /**
     * In what building this pop lives if it is housed.
     * @type {Building?}
     */
    residence;

    setWorkplace(building) {
        if(this.workplace) {
            removeIfExists(this.workplace.workers, this);
        }
        this.workplace = building;
        this.workplace?.workers?.push(this);
    }

    setResidence(building) {
        if(this.residence) {
            removeIfExists(this.residence.residents, this);
        }
        this.residence = building;
        this.residence?.residents?.push(this);
    }
}
