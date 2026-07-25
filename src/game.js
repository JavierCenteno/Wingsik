import { resetCanvasSize, runCallbacks } from './graphics.js';
import { TestDiceFeature } from './map/feature.js';
import { GRANULAR_ORIENTATION, ORIENTATION } from "./map/orientation.js";
import { Pop, RACES } from './map/pop.js';
import { RESOURCES } from './map/resource.js';
import { TERRAIN_TYPES } from './map/terrain-type.js';
import { CargoShipUnit, InfantryUnit } from './map/unit.js';
import { updateKeyboardEvents } from './views/events/game-keyboard-event.js';
import { updateMouseEvents } from './views/events/game-mouse-event.js';
import { MapView } from './views/map-view.js';

/**
 * The maximum amount of frames per second. Affects game speed.
 */
export const MAXIMUM_FRAMES_PER_SECOND = 50;

/**
 * How many seconds a single frame lasts.
 */
export const FRAME_DURATION_SECONDS = 1 / MAXIMUM_FRAMES_PER_SECOND;

/**
 * How many milliseconds a single frame lasts.
 */
export const FRAME_DURATION_MILLISECONDS = 1000 * FRAME_DURATION_SECONDS;

/**
 * Current map view.
 */
let view = new MapView(64,64);
for (let j = 8; j < 17; ++j) {
    for (let i = 8; i < 17; ++i) {
        view.map.heights[j][i] = 1;
    }
}
for (let j = 9; j < 16; ++j) {
    for (let i = 9; i < 16; ++i) {
        view.map.heights[j][i] = 2;
    }
}

view.map.terrain[4][9] = TERRAIN_TYPES.sand;
view.map.terrain[5][9] = TERRAIN_TYPES.water;
view.map.terrain[4][10] = TERRAIN_TYPES.clay;
view.map.terrain[5][10] = TERRAIN_TYPES.clay;
view.map.terrain[4][11] = TERRAIN_TYPES.water;
view.map.terrain[5][11] = TERRAIN_TYPES.water;
view.map.terrain[4][12] = TERRAIN_TYPES.limestone;
view.map.terrain[5][12] = TERRAIN_TYPES.limestone;

for (let j = 1; j < 3; ++j) {
    for (let i = 9; i < 12; ++i) {
        view.map.terrain[j][i] = TERRAIN_TYPES.water;
    }
}

for (let j = 1; j < 6; ++j) {
    for (let i = 13; i < 15; ++i) {
        view.map.terrain[j][i] = TERRAIN_TYPES.sand;
    }
}
view.map.resources[2][13] = RESOURCES.coal;
view.map.resources[3][13] = RESOURCES.coal;
view.map.resources[3][14] = RESOURCES.iron;
view.map.resources[4][14] = RESOURCES.iron;
for (let j = 1; j < 6; ++j) {
    for (let i = 16; i < 18; ++i) {
        view.map.resources[j][i] = RESOURCES.coal;
    }
}

view.map.addFeature(new TestDiceFeature(view.map, 2, 2, ORIENTATION.NORTH_EAST));
view.map.addFeature(new TestDiceFeature(view.map, 2, 6, ORIENTATION.SOUTH_EAST));
view.map.addFeature(new TestDiceFeature(view.map, 6, 2, ORIENTATION.NORTH_WEST));
view.map.addFeature(new TestDiceFeature(view.map, 6, 6, ORIENTATION.SOUTH_WEST));

view.map.addUnit(new InfantryUnit(view.map, 5, 12, GRANULAR_ORIENTATION.NORTH_EAST));
view.map.addUnit(new InfantryUnit(view.map, 5, 10, GRANULAR_ORIENTATION.EAST));
view.map.addUnit(new InfantryUnit(view.map, 5, 8, GRANULAR_ORIENTATION.SOUTH_EAST));
view.map.addUnit(new InfantryUnit(view.map, 3, 8, GRANULAR_ORIENTATION.SOUTH));
view.map.addUnit(new InfantryUnit(view.map, 1, 8, GRANULAR_ORIENTATION.SOUTH_WEST));
view.map.addUnit(new InfantryUnit(view.map, 1, 10, GRANULAR_ORIENTATION.WEST));
view.map.addUnit(new InfantryUnit(view.map, 1, 12, GRANULAR_ORIENTATION.NORTH_WEST));
view.map.addUnit(new InfantryUnit(view.map, 3, 12, GRANULAR_ORIENTATION.NORTH));

view.map.addUnit(new InfantryUnit(view.map, 1, 22, GRANULAR_ORIENTATION.WEST));
view.map.addUnit(new InfantryUnit(view.map, 5, 18, GRANULAR_ORIENTATION.WEST));

view.map.addUnit(new CargoShipUnit(view.map, 17, 34, GRANULAR_ORIENTATION.NORTH_EAST));
view.map.addUnit(new CargoShipUnit(view.map, 17, 28, GRANULAR_ORIENTATION.EAST));
view.map.addUnit(new CargoShipUnit(view.map, 17, 22, GRANULAR_ORIENTATION.SOUTH_EAST));
view.map.addUnit(new CargoShipUnit(view.map, 11, 22, GRANULAR_ORIENTATION.SOUTH));
view.map.addUnit(new CargoShipUnit(view.map, 5, 22, GRANULAR_ORIENTATION.SOUTH_WEST));
view.map.addUnit(new CargoShipUnit(view.map, 5, 28, GRANULAR_ORIENTATION.WEST));
view.map.addUnit(new CargoShipUnit(view.map, 5, 34, GRANULAR_ORIENTATION.NORTH_WEST));
view.map.addUnit(new CargoShipUnit(view.map, 11, 34, GRANULAR_ORIENTATION.NORTH));

for (let i = 0; i < 10; ++i) {
    view.map.pops.push(new Pop(RACES.earthPony));
}

var infantryUnit = new InfantryUnit(view.map, 0.5, 0.5, GRANULAR_ORIENTATION.NORTH_EAST);
view.map.addUnit(infantryUnit);
infantryUnit.goingTowards = [10, 20];

/**
 * Main game loop function.
 */
export const game = async () => {
    while (true) {
        const timeAtStartOfFrameMs = Date.now();
        frame();
        const timeToNextFrameMs = timeAtStartOfFrameMs + FRAME_DURATION_MILLISECONDS - Date.now();
        if (timeToNextFrameMs > 0) {
            // wait timeToNextFrameMs milliseconds until the next iteration
            await new Promise(resolve => setTimeout(resolve, timeToNextFrameMs));
        }
    }
}

/**
 * Whether the window has been resized since the last frame.
 */
let RESIZED = false;

window.addEventListener('resize', () => {
    RESIZED = true;
}, true);

/**
 * Draw a new frame.
 */
const frame = () => {
    if (RESIZED) {
        resetCanvasSize();
        RESIZED = false;
    }
    view.tick();
    // No need to render the frame if the user isn't looking at the tab
    if (!document.hidden) {
        view.render();
    }
    runCallbacks();
    updateKeyboardEvents();
    updateMouseEvents();
}
