import { ORIENTATION, TILE_HEIGHT, TILE_WIDTH, View } from './view.js';
import { clear, getWindowSize, setCanvasSize } from './graphics.js';
import { KEY_BINDINGS, KEYS_PRESSED, KEYS_HELD_DOWN, CLICK_STARTED, CLICK_LAST_FRAME, CLICK_CURRENT, CLICK_ENDED, RESIZED, updateEvents, WHEEL } from './input.js';
import { TreeFeature } from './map/feature.js'

/**
 * How many milliseconds a frame lasts.
 */
const FRAME_DURATION_MS = 50;

/**
 * Current map view.
 */
let view = new View(12,16);
for (let j = 2; j < 11; ++j) {
  for (let i = 2; i < 11; ++i) {
    view.map.heights[j][i] = 1;
  }
}
for (let j = 3; j < 10; ++j) {
  for (let i = 3; i < 10; ++i) {
    view.map.heights[j][i] = 2;
  }
}

view.map.addFeature(new TreeFeature(4,4,ORIENTATION.NORTH_EAST))
view.map.addFeature(new TreeFeature(7,7,ORIENTATION.SOUTH_WEST))
view.map.addFeature(new TreeFeature(4,7,ORIENTATION.NORTH_WEST))
view.map.addFeature(new TreeFeature(7,4,ORIENTATION.SOUTH_EAST))

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
