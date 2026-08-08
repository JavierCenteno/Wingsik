import { BUILDING_FARM_SPRITES, BUILDING_MINE_SPRITES, BUILDING_TENEMENT_SPRITES } from "../sprites.js";
import { MapElement } from "./map-element.js";
import { ORIENTATION } from "./orientation.js";
import { TECHNOLOGIES, Technology } from "./technology.js";

export class BuildingType {
    /**
     * Key of this building type for dictionary lookups.
     * @type {string}
     */
    key;
    /**
     * How many tiles along the x (west-east) axis buildings of this type take in their default orientation (north east).
     * @type {number}
     */
    sizeX;
    /**
     * How many tiles along the y (south-north) axis buildings of this type take in their default orientation (north east).
     * @type {number}
     */
    sizeY;
    /**
     * Sprites for buildings of this type.
     * @type {Sprite}
     */
    sprite;
    /**
     * Which technology is required for buildings of this type.
     * @type {Technology?}
     */
    requires;

    constructor(key, sizeX, sizeY, sprite, requires) {
        this.key = key;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.sprite = sprite;
    }
}

export const BUILDING_TYPES = {};

// Infrastructure

// BUILDING_TYPES.dock = new BuildingType('dock', 1, 1, BUILDING_DOCK_SPRITES, null);
// BUILDING_TYPES.airport = new BuildingType('airport', 1, 1, BUILDING_AIRPORT_SPRITES, TECHNOLOGIES.combustion);
// BUILDING_TYPES.electricSubstation = new BuildingType('dock', 1, 1, BUILDING_DOCK_SPRITES, TECHNOLOGIES.electricity);
// BUILDING_TYPES.coalPlant = new BuildingType('dock', 1, 1, BUILDING_DOCK_SPRITES, TECHNOLOGIES.electricity);

// Primary

BUILDING_TYPES.farm = new BuildingType('farm', 2, 3, BUILDING_FARM_SPRITES, null);
BUILDING_TYPES.mine = new BuildingType('mine', 2, 2, BUILDING_MINE_SPRITES, null);
// BUILDING_TYPES.quarry = new BuildingType('quarry', 2, 2, BUILDING_MINE_SPRITES, null);
// BUILDING_TYPES.saltern = new BuildingType('saltern', 2, 2, BUILDING_MINE_SPRITES, null);
// BUILDING_TYPES.oilWell = new BuildingType('oilWell', 2, 2, BUILDING_MINE_SPRITES, TECHNOLOGIES.electricity);

// Industry

// BUILDING_TYPES.refinery = new BuildingType('refinery', 2, 2, BUILDING_MINE_SPRITES, TECHNOLOGIES.refining);

// Economy

// Media

// BUILDING_TYPES.school
// BUILDING_TYPES.university
// BUILDING_TYPES.newspaper = new BuildingType('newspaper', 2, 3, BUILDING_FARM_SPRITES, null);
// BUILDING_TYPES.telegraphExchange = new BuildingType('telegraphExchange', 2, 3, BUILDING_FARM_SPRITES, TECHNOLOGIES.telegraphy);
// BUILDING_TYPES.radioStation = new BuildingType('radioStation', 2, 3, BUILDING_FARM_SPRITES, TECHNOLOGIES.radiophony);
// BUILDING_TYPES.televisionStation = new BuildingType('televisionStation', 2, 3, BUILDING_FARM_SPRITES, TECHNOLOGIES.television);

// Welfare

// BUILDING_TYPES.clinic = new BuildingType('clinic', 2, 3, BUILDING_TENEMENT_SPRITES, null);
BUILDING_TYPES.hospital = new BuildingType('hospital', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.asylum = new BuildingType('asylum', 2, 3, BUILDING_TENEMENT_SPRITES, TECHNOLOGIES.psychiatry);
// BUILDING_TYPES.dump = new BuildingType('dump', 2, 3, BUILDING_TENEMENT_SPRITES, null);

// Housing

BUILDING_TYPES.tenement = new BuildingType('tenement', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.apartment = new BuildingType('apartment', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.townhouse = new BuildingType('townhouse', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.condominium = new BuildingType('condominium', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.mansion = new BuildingType('mansion', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.motel = new BuildingType('motel', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.hotel = new BuildingType('hotel', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.luxuryHotel = new BuildingType('luxuryHotel', 2, 3, BUILDING_TENEMENT_SPRITES, null);

// Entertainment

// BUILDING_TYPES.bar = new BuildingType('bar', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.theater = new BuildingType('theater', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.cinema = new BuildingType('cinema', 2, 3, BUILDING_TENEMENT_SPRITES, TECHNOLOGIES.cinematography);

// Government

// BUILDING_TYPES.firehouse = new BuildingType('firehouse', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.constabulary = new BuildingType('constabulary', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.prison = new BuildingType('prison', 2, 3, BUILDING_TENEMENT_SPRITES, null);
// BUILDING_TYPES.postOffice = new BuildingType('postOffice', 2, 3, BUILDING_TENEMENT_SPRITES, null);

// Military

export class Building extends MapElement {
    /**
     * Type of this building.
     */
    type;
    /**
     * Location of this building along the x (west-east) axis. This is a discrete tile index.
     */
    x;
    /**
     * Location of this building along the y (south-north) axis. This is a discrete tile index.
     */
    y;
    /**
     * Orientation of this building.
     */
    orientation;
    /**
     * Workers of this building.
     * @type {Pop[]}
     */
    workers = [];
    /**
     * Residents of this building.
     * @type {Pop[]}
     */
    residents = [];

    /**
     * Lowest tile index of the range of tiles occupied by this building along the x (west-east) axis.
     */
    get minX() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.NORTH_WEST:
                return this.x - (this.type.sizeX - 1);
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_EAST:
                return this.x;
        }
    }
    /**
     * Highest tile index of the range of tiles occupied by this building along the x (west-east) axis.
     */
    get maxX() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.NORTH_WEST:
                return this.x;
            case ORIENTATION.SOUTH_EAST:
            case ORIENTATION.NORTH_EAST:
                return this.x + (this.type.sizeX - 1);
        }
    }
    /**
     * Lowest tile index of the range of tiles occupied by this building along the y (south-north) axis.
     */
    get minY() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
                return this.y - (this.type.sizeY - 1);
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return this.y;
        }
    }
    /**
     * Highest tile index of the range of tiles occupied by this building along the y (south-north) axis.
     */
    get maxY() {
        switch (this.orientation) {
            case ORIENTATION.SOUTH_WEST:
            case ORIENTATION.SOUTH_EAST:
                return this.y;
            case ORIENTATION.NORTH_WEST:
            case ORIENTATION.NORTH_EAST:
                return this.y + (this.type.sizeY - 1);
        }
    }

    /**
     * @param {Map} map Map where this building is located
     * @param {BuildingType} type Type of this building
     * @param {number} x Location of this building along the x (west-east) axis
     * @param {number} y Location of this building along the y (south-north) axis
     * @param {GranularOrientation} orientation Orientation of this building
     */
    constructor(map, type, x, y, orientation) {
        super(map);
        this.type = type;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    tick() {
    }

    /**
     * Checks whether a building of this type can be built at its location.
     * Used for when a building is a ghost for a player planning its construction.
     */
    canBeBuilt() {
        // default implementation: simply check whether all the tiles are flat and not occupied
        if (this.map.areTilesOccupied(this.minX, this.maxX, this.minY, this.maxY)) {
            return false;
        }
        for (let j = this.minY; j <= this.maxY; ++j) {
            for (let i = this.minX; i <= this.maxX; ++i) {
                if (!this.map.isTileFlat(i, j)) {
                    return false;
                }
            }
        }
        return true;
    }
}

export class FarmBuilding extends Building {
    constructor(map, x, y, orientation) {
        super(map, BUILDING_TYPES.farm, x, y, orientation)
    }
    
    tick() {
        // TODO
    }
}

export class MineBuilding extends Building {
    constructor(map, x, y, orientation) {
        super(map, BUILDING_TYPES.mine, x, y, orientation)
    }
    
    tick() {
        // TODO
    }
}

export class TenementBuilding extends Building {
    constructor(map, x, y, orientation) {
        super(map, BUILDING_TYPES.tenement, x, y, orientation)
    }
    
    tick() {
        // TODO
    }
}

export class HospitalBuilding extends Building {
    baseQuality = 20;
    capacity = 10;

    constructor(map, x, y, orientation) {
        super(map, BUILDING_TYPES.hospital, x, y, orientation)
    }
    
    tick() {
        // how many customers are currently using this building
        const customerCount = 10;
        // effective building quality accounting for overcrowding
        const buildingQuality = this.baseQuality *
            (1 - (( customerCount - this.capacity ) / this.capacity) ** (1 / 3))
        
    }
}
