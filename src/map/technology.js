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
TECHNOLOGIES.internalCombustion = new Technology(
        'internalCombustion',
        [ TECHNOLOGIES.refining ]
    );
TECHNOLOGIES.ecology = new Technology(
        'ecology',
        [ TECHNOLOGIES.refining, TECHNOLOGIES.waterTreatment ]
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
        [ TECHNOLOGIES.radiophony, TECHNOLOGIES.internalCombustion ]
    );
TECHNOLOGIES.plastics = new Technology(
        'plastics',
        [ TECHNOLOGIES.plastics ]
    );
TECHNOLOGIES.bacteriology = new Technology(
        'bacteriology',
        [ TECHNOLOGIES.bacteriology ]
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
TECHNOLOGIES.mechanicalFlight = new Technology(
        'mechanicalFlight',
        [ TECHNOLOGIES.assemblyLine ]
    );
TECHNOLOGIES.rocketry = new Technology(
        'rocketry',
        [ TECHNOLOGIES.assemblyLine, TECHNOLOGIES.plastics ]
    );
TECHNOLOGIES.pharmacology = new Technology(
        'pharmacology',
        [ TECHNOLOGIES.plastics, TECHNOLOGIES.bacteriology ]
    );
