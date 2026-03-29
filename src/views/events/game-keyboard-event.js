import { removeIfExists } from "../../util/list-util.js";
import { GameEvent } from "./game-event.js";

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
 * Which keys are currently being held down.
 */
let KEYS_HELD_DOWN = {};

document.addEventListener('keydown', (event) => {
    if (event.repeat) {
        return;
    }
    keyPressedEvents.push(new GameKeyPressedEvent(event.key));
    KEYS_HELD_DOWN[event.key] = (KEYS_HELD_DOWN[event.key] || 0) + 1;
})

document.addEventListener('keyup', (event) => {
    KEYS_HELD_DOWN[event.key] = 0;
})

export const keyPressedEvents = [];

export class GameKeyPressedEvent extends GameEvent {
    /**
     * Which key this event involves.
     * @type {string}
     */
    key;

    constructor(key) {
        super();
        this.key = key;
    }

    cancel() {
        removeIfExists(keyPressedEvents, this);
    }
}

export const keyHeldDownEvents = [];

export class GameKeyHeldDownEvent extends GameEvent {
    /**
     * Which key this event involves.
     * @type {string}
     */
    key;
    /**
     * For how many frames the key has been held down.
     * @type {number}
     */
    time;

    constructor(key, number) {
        super();
        this.key = key;
        this.number = number;
    }

    cancel() {
        removeIfExists(keyHeldDownEvents, this);
    }
}

export const updateKeyboardEvents = () => {
    for (const key in KEYS_HELD_DOWN) {
        const time = KEYS_HELD_DOWN[key];
        if(time > 0) {
            keyHeldDownEvents.push(new GameKeyHeldDownEvent(key, time));
        }
    }
}
