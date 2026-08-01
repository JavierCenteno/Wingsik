export class Technology {
    /**
     * Key of this technology for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * Technologies that a polity must have before having this technology.
     * @type {Technology[]}
     */
    prerequisites;

    constructor(key, prerequisites) {
        this.key = key;
        this.prerequisites = prerequisites;
    }
}

export const TECHNOLOGIES = {};

// level 1

TECHNOLOGIES.electricity = new Technology(
        'electricity',
        []
    );

// level 2

TECHNOLOGIES.phonography = new Technology(
        'phonography',
        [ TECHNOLOGIES.electricity ]
    );
TECHNOLOGIES.telegraphy = new Technology(
        'telegraphy',
        [ TECHNOLOGIES.electricity ]
    );
TECHNOLOGIES.lightbulb = new Technology(
        'lightbulb',
        [ TECHNOLOGIES.electricity ]
    );
TECHNOLOGIES.chemistry = new Technology(
        'chemistry',
        [ TECHNOLOGIES.electricity ]
    );
TECHNOLOGIES.refrigeration = new Technology(
        'refrigeration',
        [ TECHNOLOGIES.electricity ]
    );
TECHNOLOGIES.psychiatry = new Technology(
        'psychiatry',
        [ TECHNOLOGIES.electricity ]
    );

// level 3

TECHNOLOGIES.telephony = new Technology(
        'telephony',
        [ TECHNOLOGIES.phonography, TECHNOLOGIES.telegraphy ]
    );
TECHNOLOGIES.electronics = new Technology(
        'electronics',
        [ TECHNOLOGIES.telegraphy, TECHNOLOGIES.lightbulb ]
    );
TECHNOLOGIES.photography = new Technology(
        'photography',
        [ TECHNOLOGIES.lightbulb, TECHNOLOGIES.chemistry ]
    );
TECHNOLOGIES.refining = new Technology(
        'refining',
        [ TECHNOLOGIES.chemistry ]
    );
TECHNOLOGIES.waterTreatment = new Technology(
        'waterTreatment',
        [ TECHNOLOGIES.chemistry, TECHNOLOGIES.refrigeration ]
    );
TECHNOLOGIES.economics = new Technology(
        'economics',
        [ TECHNOLOGIES.refrigeration, TECHNOLOGIES.psychiatry ]
    );

// level 4

TECHNOLOGIES.calculators = new Technology(
        'calculators',
        [ TECHNOLOGIES.electronics ]
    );
TECHNOLOGIES.radiophony = new Technology(
        'radiophony',
        [ TECHNOLOGIES.telephony, TECHNOLOGIES.electronics ]
    );
TECHNOLOGIES.cinematography = new Technology(
        'cinematography',
        [ TECHNOLOGIES.electronics, TECHNOLOGIES.photography ]
    );
TECHNOLOGIES.combustion = new Technology(
        'combustion',
        [ TECHNOLOGIES.refining ]
    );
TECHNOLOGIES.ecology = new Technology(
        'ecology',
        [ TECHNOLOGIES.refining, TECHNOLOGIES.waterTreatment, TECHNOLOGIES.economics ]
    );
TECHNOLOGIES.urbanism = new Technology(
        'urbanism',
        [ TECHNOLOGIES.waterTreatment, TECHNOLOGIES.economics ]
    );

// level 5

TECHNOLOGIES.cryptology = new Technology(
        'cryptology',
        [ TECHNOLOGIES.calculators, TECHNOLOGIES.radiophony ]
    );
TECHNOLOGIES.television = new Technology(
        'television',
        [ TECHNOLOGIES.radiophony, TECHNOLOGIES.cinematography ]
    );
TECHNOLOGIES.assemblyLine = new Technology(
        'assemblyLine',
        [ TECHNOLOGIES.radiophony, TECHNOLOGIES.combustion ]
    );
TECHNOLOGIES.plastics = new Technology(
        'plastics',
        [ TECHNOLOGIES.cinematography, TECHNOLOGIES.combustion, TECHNOLOGIES.ecology ]
    );
// makes hospitals more efficient at handling epidemics
TECHNOLOGIES.bacteriology = new Technology(
        'bacteriology',
        [ TECHNOLOGIES.ecology ]
    );
// unlocks the zoo and museum
TECHNOLOGIES.archeology = new Technology(
        'archeology',
        [ TECHNOLOGIES.ecology, TECHNOLOGIES.urbanism ]
    );

// level 6

TECHNOLOGIES.computers = new Technology(
        'computers',
        [ TECHNOLOGIES.cryptology, TECHNOLOGIES.television ]
    );
TECHNOLOGIES.automation = new Technology(
        'automation',
        [ TECHNOLOGIES.cryptology, TECHNOLOGIES.assemblyLine ]
    );
TECHNOLOGIES.aviation = new Technology(
        'aviation',
        [ TECHNOLOGIES.assemblyLine ]
    );
TECHNOLOGIES.rocketry = new Technology(
        'rocketry',
        [ TECHNOLOGIES.assemblyLine, TECHNOLOGIES.plastics ]
    );
// makes hospitals, clinics, asylums and constabularies more efficient
TECHNOLOGIES.pharmacology = new Technology(
        'pharmacology',
        [ TECHNOLOGIES.plastics, TECHNOLOGIES.bacteriology, TECHNOLOGIES.archeology ]
    );
// makes farms more efficient
TECHNOLOGIES.agroengineering = new Technology(
        'agroengineering',
        [ TECHNOLOGIES.bacteriology, TECHNOLOGIES.archeology ]
    );
