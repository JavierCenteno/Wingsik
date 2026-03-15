export const KEYS = {
    ALT: 'Alt',
    BACKSPACE: 'Backspace',
    CONTROL: 'Control',
    DELETE: 'Delete',
    END: 'End',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    HOME: 'Home',
    INSERT: 'Insert',
    META: 'Meta',
    PAGE_DOWN: 'PageDown',
    PAGE_UP: 'PageUp',
    SHIFT: 'Shift',
    TAB: 'Tab'
}

export const KEY_BINDINGS = {
    MOVE_DOWN: 's',
    MOVE_UP: 'w',
    MOVE_LEFT: 'a',
    MOVE_RIGHT: 'd',
    ROTATE_CLOCKWISE: 'q',
    ROTATE_COUNTERCLOCKWISE: 'e',
    INCREASE_ZOOM: '+',
    DECREASE_ZOOM: '-'
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
/**
 * At which coordinates of the screen the cursor is.
 */
export let CURSOR_CURRENT = undefined;
/**
 * Whether the window has been resized since the last frame.
 */
export let RESIZED = false;
/**
 * How much the mouse wheel has scrolled in or out since the last frame.
 */
export let WHEEL = 0;

export const updateEvents = () => {
    KEYS_PRESSED = {};
    if (CLICK_STARTED) {
        CLICK_LAST_FRAME = CLICK_CURRENT;
        // only clear click events if the click is finished
        if (CLICK_ENDED !== undefined) {
            CLICK_STARTED = undefined;
            CLICK_LAST_FRAME = undefined;
            CLICK_CURRENT = undefined;
            CLICK_ENDED = undefined;
        }
    }
    RESIZED = false;
    WHEEL = 0;
}

document.addEventListener('keydown', (event) => {
    if (event.repeat) {
        return;
    }
    KEYS_PRESSED[event.key] = (KEYS_PRESSED[event.key] || 0) + 1;
    KEYS_HELD_DOWN[event.key] = (KEYS_HELD_DOWN[event.key] || 0) + 1;
})

document.addEventListener('keyup', (event) => {
    KEYS_HELD_DOWN[event.key] = 0;
})

const getPixelCoordinates = (event) => {
    return [Math.round(event.pageX * window.devicePixelRatio), Math.round(event.pageY * window.devicePixelRatio)];
}

document.addEventListener('mousedown', (event) => {
    event.preventDefault();
    CLICK_STARTED = getPixelCoordinates(event);
    CLICK_LAST_FRAME = getPixelCoordinates(event);
    CLICK_CURRENT = getPixelCoordinates(event);
    CURSOR_CURRENT = getPixelCoordinates(event);
})

document.addEventListener('mouseup', (event) => {
    event.preventDefault();
    if (CLICK_STARTED) {
        CLICK_ENDED = getPixelCoordinates(event);
    }
    CURSOR_CURRENT = getPixelCoordinates(event);
})

document.addEventListener('mousemove', (event) => {
    event.preventDefault();
    if (CLICK_STARTED) {
        CLICK_CURRENT = getPixelCoordinates(event);
    }
    CURSOR_CURRENT = getPixelCoordinates(event);
})

document.addEventListener('wheel', (event) => {
    WHEEL += event.deltaY;
})

window.addEventListener('resize', (event) => {
    RESIZED = true;
}, true);
