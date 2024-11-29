export const KEY_BINDINGS = {
    MOVE_DOWN: 's',
    MOVE_UP: 'w',
    MOVE_LEFT: 'a',
    MOVE_RIGHT: 'd',
    ROTATE_CLOCKWISE: 'q',
    ROTATE_COUNTERCLOCKWISE: 'e'
}

/**
 * Which keys have been pressed since the last frame.
 */
export let KEYS_PRESSED = {};
/**
 * Which keys are currently being held down.
 */
export let KEYS_HELD_DOWN = {};
/**
 * At which coordinates of the screen the last click started.
 */
export let CLICK_STARTED = undefined;
/**
 * At which coordinates of the screen the current click was in the last frame.
 */
export let CLICK_LAST_FRAME = undefined;
/**
 * At which coordinates of the screen the current click is.
 */
export let CLICK_CURRENT = undefined;
/**
 * At which coordinates of the screen the last click ended.
 */
export let CLICK_ENDED = undefined;

export const updateEvents = () => {
    KEYS_PRESSED = {};
    if(CLICK_STARTED) {
        CLICK_LAST_FRAME = CLICK_CURRENT;
        // only clear click events if the click is finished
        if(CLICK_ENDED !== undefined) {
            CLICK_STARTED = undefined;
            CLICK_LAST_FRAME = undefined;
            CLICK_CURRENT = undefined;
            CLICK_ENDED = undefined;
        }
    }
}

document.addEventListener('keydown', (event) => {
    KEYS_PRESSED[event.key] = (KEYS_PRESSED[event.key] || 0) + 1;
    KEYS_HELD_DOWN[event.key] = 1;
})

document.addEventListener('keyup', (event) => {
    KEYS_PRESSED[event.key] = (KEYS_PRESSED[event.key] || 0) + 1;
    KEYS_HELD_DOWN[event.key] = 0;
})

document.addEventListener('mousedown', (event) => {
    CLICK_STARTED = [event.pageX, event.pageY];
    CLICK_LAST_FRAME = [event.pageX, event.pageY];
    CLICK_CURRENT = [event.pageX, event.pageY];
})

document.addEventListener('mouseup', (event) => {
    if(CLICK_STARTED) {
        CLICK_ENDED = [event.pageX, event.pageY];
    }
})

document.addEventListener('mousemove', (event) => {
    if(CLICK_STARTED) {
        CLICK_CURRENT = [event.pageX, event.pageY];
    }
})
