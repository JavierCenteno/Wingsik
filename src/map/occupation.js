import { RACES } from "./pop";

export class Occupation {
    key;

    minorRacialSynergies;
    majorRacialSynergies;

    constructor(key, minorRacialSynergies, majorRacialSynergies) {
        this.key = key;
        this.minorRacialSynergies = minorRacialSynergies;
        this.majorRacialSynergies = majorRacialSynergies;
    }
}

export const OCCUPATIONS = {};

OCCUPATIONS.unemployed = new Occupation('unemployed', []);

OCCUPATIONS.actor = new Occupation('actor',
    [ RACES.unicorn, RACES.kirin ],
    [ RACES.changeling ]
);
OCCUPATIONS.artist = new Occupation('artist',
    [ RACES.unicorn, RACES.kirin ],
    []
);
OCCUPATIONS.athlete = new Occupation('athlete',
    [],
    []
);
OCCUPATIONS.attendant = new Occupation('attendant',
    [],
    []
);
OCCUPATIONS.banker = new Occupation('banker',
    [],
    []
);
OCCUPATIONS.builder = new Occupation('builder',
    [ RACES.buffalo, RACES.donkey, RACES.earthPony, RACES.pegasus, RACES.yak ],
    []
);
OCCUPATIONS.chemist = new Occupation('chemist',
    [ RACES.unicorn, RACES.kirin ],
    []
);
OCCUPATIONS.engineer = new Occupation('engineer',
    [],
    []
);
OCCUPATIONS.factoryWorker = new Occupation('factoryWorker',
    [ RACES.donkey, RACES.earthPony ],
    []
);
OCCUPATIONS.farmer = new Occupation('farmer',
    [ RACES.buffalo, RACES.yak ],
    [ RACES.deer, RACES.cattle, RACES.earthPony, RACES.zebra ]
);
OCCUPATIONS.firefighter = new Occupation('firefighter',
    [ RACES.griffon ],
    [ RACES.dragon, RACES.kirin, RACES.pegasus ]
);
OCCUPATIONS.journalist = new Occupation('journalist',
    [ RACES.griffon, RACES.pegasus ],
    [ RACES.changeling ]
);
OCCUPATIONS.lumberjack = new Occupation('lumberjack',
    [],
    [ RACES.earthPony, RACES.yak ]
);
OCCUPATIONS.mailCarrier = new Occupation('mailCarrier',
    [],
    [ RACES.griffon, RACES.pegasus ]
);
OCCUPATIONS.miner = new Occupation('miner',
    [ RACES.donkey, RACES.earthPony ],
    []
);
OCCUPATIONS.musician = new Occupation('musician',
    [],
    []
);
OCCUPATIONS.officeWorker = new Occupation('officeWorker',
    [],
    []
);
OCCUPATIONS.physician = new Occupation('physician',
    [ RACES.unicorn, RACES.zebra ],
    [ RACES.kirin ]
);
OCCUPATIONS.policeOfficer = new Occupation('policeOfficer',
    [ RACES.kirin, RACES.unicorn ],
    [ RACES.griffon, RACES.pegasus ]
);
OCCUPATIONS.secretAgent = new Occupation('secretAgent',
    [ RACES.unicorn, RACES.kirin ],
    [ RACES.changeling ]
);
OCCUPATIONS.secretAgent = new Occupation('soldier',
    [],
    []
);
OCCUPATIONS.teacher = new Occupation('teacher',
    [],
    []
);
OCCUPATIONS.teamster = new Occupation('teamster',
    [],
    []
);
OCCUPATIONS.weatherController = new Occupation('weatherController',
    [],
    [ RACES.pegasus ]
);
