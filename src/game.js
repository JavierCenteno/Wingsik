import { TILE_HEIGHT, TILE_WIDTH, View } from './view.js';
import { Map } from './map.js';
import { clear, getWindowSize, setCanvasSize } from './graphics.js';
import { KEY_BINDINGS, KEYS_PRESSED, KEYS_HELD_DOWN, CLICK_STARTED, CLICK_LAST_FRAME, CLICK_CURRENT, CLICK_ENDED, RESIZED, updateEvents } from './input.js';

/**
 * How many milliseconds a frame lasts.
 */
const FRAME_DURATION_MS = 50;

/**
 * Current map view.
 */
let view = new View(new Map(6,8));

/**
 * Main game loop function.
 */
export const game = async () => {
    while(true) {
        const timeAtStartOfFrameMs = Date.now();
        frame();
        const timeToNextFrameMs = timeAtStartOfFrameMs + FRAME_DURATION_MS - Date.now();
        if(timeToNextFrameMs > 0) {
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
    if(!document.hidden) {
      clear();
      view.draw();
    }
    updateEvents();
}

/**
 * Process all the events that are pending to be processed.
 */
const processEvents = () => {
    const keysPressedOrHeldDown = { ...KEYS_PRESSED, ...KEYS_HELD_DOWN };
    for(const key in keysPressedOrHeldDown) {
        if(keysPressedOrHeldDown[key] > 0) {
            switch(key) {
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
              }
        }
    }
    if(CLICK_CURRENT !== undefined && CLICK_LAST_FRAME !== undefined) {
        view.moveLeft((CLICK_CURRENT[0] - CLICK_LAST_FRAME[0]) / TILE_WIDTH);
        view.moveUp((CLICK_CURRENT[1] - CLICK_LAST_FRAME[1]) / TILE_HEIGHT);
    }
    if(RESIZED) {
        setCanvasSize(getWindowSize());
    }
}
