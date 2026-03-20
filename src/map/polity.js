export class Polity {
    /**
     * Key of this polity for dictionary lookups.
     * @type {string}
     */
    key;

    constructor(key) {
        this.key = key;
    }
}

export const POLITIES = {};

POLITIES.crystalEmpire = new Polity('crystalEmpire');
POLITIES.deerConfederacy = new Polity('deerConfederacy');
POLITIES.dragonLands = new Polity('dragonLands');
POLITIES.equestria = new Polity('equestria');
POLITIES.farasi = new Polity('farasi');
POLITIES.griffonstone = new Polity('griffonstone');
POLITIES.qilinia = new Polity('qilinia');
POLITIES.yakyakistan = new Polity('yakyakistan');
