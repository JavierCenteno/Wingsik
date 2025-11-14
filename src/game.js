import { clear, getWindowSize, setCanvasSize } from './graphics.js';
import { CLICK_CURRENT, CLICK_LAST_FRAME, KEY_BINDINGS, KEYS_HELD_DOWN, KEYS_PRESSED, RESIZED, updateEvents, WHEEL } from './input.js';
import { TestDiceFeature } from './map/feature.js';
import { Terrain } from './map/map.js';
import { CargoShipUnit, InfantryUnit } from './map/unit.js';
import { GRANULAR_ORIENTATION, ORIENTATION, TILE_HEIGHT, TILE_WIDTH, View } from './view.js';

/**
 * How many milliseconds a frame lasts.
 */
const FRAME_DURATION_MS = 50;

/**
 * Current map view.
 */
let view = new View(40,64);
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

for (let j = 1; j < 3; ++j) {
  for (let i = 9; i < 11; ++i) {
    view.map.terrain[j][i] = Terrain.WATER;
  }
}

view.map.addFeature(new TestDiceFeature(1, 1, ORIENTATION.NORTH_EAST));
view.map.addFeature(new TestDiceFeature(1, 5, ORIENTATION.SOUTH_EAST));
view.map.addFeature(new TestDiceFeature(5, 1, ORIENTATION.NORTH_WEST));
view.map.addFeature(new TestDiceFeature(5, 5, ORIENTATION.SOUTH_WEST));

view.map.addUnit(new InfantryUnit(5, 12, GRANULAR_ORIENTATION.NORTH_EAST));
view.map.addUnit(new InfantryUnit(5, 10, GRANULAR_ORIENTATION.EAST));
view.map.addUnit(new InfantryUnit(5, 8, GRANULAR_ORIENTATION.SOUTH_EAST));
view.map.addUnit(new InfantryUnit(3, 8, GRANULAR_ORIENTATION.SOUTH));
view.map.addUnit(new InfantryUnit(1, 8, GRANULAR_ORIENTATION.SOUTH_WEST));
view.map.addUnit(new InfantryUnit(1, 10, GRANULAR_ORIENTATION.WEST));
view.map.addUnit(new InfantryUnit(1, 12, GRANULAR_ORIENTATION.NORTH_WEST));
view.map.addUnit(new InfantryUnit(3, 12, GRANULAR_ORIENTATION.NORTH));

view.map.addUnit(new InfantryUnit(1, 22, GRANULAR_ORIENTATION.WEST));
view.map.addUnit(new InfantryUnit(5, 18, GRANULAR_ORIENTATION.WEST));

view.map.addUnit(new CargoShipUnit(17, 34, GRANULAR_ORIENTATION.NORTH_EAST));
view.map.addUnit(new CargoShipUnit(17, 28, GRANULAR_ORIENTATION.EAST));
view.map.addUnit(new CargoShipUnit(17, 22, GRANULAR_ORIENTATION.SOUTH_EAST));
view.map.addUnit(new CargoShipUnit(11, 22, GRANULAR_ORIENTATION.SOUTH));
view.map.addUnit(new CargoShipUnit(5, 22, GRANULAR_ORIENTATION.SOUTH_WEST));
view.map.addUnit(new CargoShipUnit(5, 28, GRANULAR_ORIENTATION.WEST));
view.map.addUnit(new CargoShipUnit(5, 34, GRANULAR_ORIENTATION.NORTH_WEST));
view.map.addUnit(new CargoShipUnit(11, 34, GRANULAR_ORIENTATION.NORTH));

view.map.addUnit(new InfantryUnit(0.5, 0.5, GRANULAR_ORIENTATION.NORTH_EAST));

/**
 * Main game loop function.
 */
export const game = async () => {
  while (true) {
    const timeAtStartOfFrameMs = Date.now();
    frame();
    const timeToNextFrameMs = timeAtStartOfFrameMs + FRAME_DURATION_MS - Date.now();
    if (timeToNextFrameMs > 0) {
      // wait timeToNextFrameMs milliseconds until the next iteration
      await new Promise(resolve => setTimeout(resolve, timeToNextFrameMs));
    }
  }
}

/**
 * Draw a new frame.
 */
const frame = () => {
  processEvents();
  // No need to render the frame if the user isn't looking at the tab
  if (!document.hidden) {
    clear();
    view.draw();
  }
  updateEvents();
}

/**
 * Process all the events that are pending to be processed.
 */
const processEvents = () => {
  for (const key in KEYS_PRESSED) {
    if (KEYS_PRESSED[key] > 0) {
      switch (key) {
        case KEY_BINDINGS.MOVE_DOWN:
          view.moveDown();
          break;
        case KEY_BINDINGS.MOVE_UP:
          view.moveUp();
          break;
        case KEY_BINDINGS.MOVE_LEFT:
          view.moveLeft();
          break;
        case KEY_BINDINGS.MOVE_RIGHT:
          view.moveRight();
          break;
        case KEY_BINDINGS.ROTATE_CLOCKWISE:
          view.rotateClockwise();
          break;
        case KEY_BINDINGS.ROTATE_COUNTERCLOCKWISE:
          view.rotateCounterclockwise();
          break;
        case KEY_BINDINGS.INCREASE_ZOOM:
          view.increaseZoom();
          break;
        case KEY_BINDINGS.DECREASE_ZOOM:
          view.decreaseZoom();
          break;
      }
    }
  }
  for (const key in KEYS_HELD_DOWN) {
    if (KEYS_HELD_DOWN[key] > 0) {
      switch (key) {
        case KEY_BINDINGS.MOVE_DOWN:
          view.moveDown();
          break;
        case KEY_BINDINGS.MOVE_UP:
          view.moveUp();
          break;
        case KEY_BINDINGS.MOVE_LEFT:
          view.moveLeft();
          break;
        case KEY_BINDINGS.MOVE_RIGHT:
          view.moveRight();
          break;
      }
    }
  }
  if (CLICK_CURRENT !== undefined && CLICK_LAST_FRAME !== undefined) {
    view.moveLeft((CLICK_CURRENT[0] - CLICK_LAST_FRAME[0]) / (TILE_WIDTH * view.zoomLevel));
    view.moveUp((CLICK_CURRENT[1] - CLICK_LAST_FRAME[1]) / (TILE_HEIGHT * view.zoomLevel));
  }
  if (RESIZED) {
    setCanvasSize(getWindowSize());
  }
  if (WHEEL < 0) {
    view.increaseZoom();
  }
  if (WHEEL > 0) {
    view.decreaseZoom();
  }
}
