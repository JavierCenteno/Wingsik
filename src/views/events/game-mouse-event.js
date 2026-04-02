import { GameEvent } from "./game-event.js";

/**
 * At which coordinates of the screen the last click started.
 */
let CLICK_STARTED = undefined;
/**
 * Whether a drag event is happening.
 */
let DRAGGING = false;
/**
 * At which coordinates of the screen the current click was in the last frame.
 */
let CLICK_LAST_DRAG = undefined;
/**
 * At which coordinates of the screen the current click is.
 */
let CLICK_CURRENT_DRAG = undefined;
/**
 * Whether the click event is a secondary click.
 */
let SECONDARY_CLICK = false;
/**
 * Whether the mouse is in the document.
 */
let MOUSE_ON_DOCUMENT = false;
/**
 * How much the mouse wheel has scrolled in or out since the last frame.
 */
let WHEEL = 0;

document.addEventListener('mousedown', (event) => {
    event.preventDefault();
    if (event.button === 0) {
        CLICK_STARTED = getPixelCoordinates(event);
        CLICK_LAST_DRAG = CLICK_STARTED;
        CLICK_CURRENT_DRAG = CLICK_STARTED;
        SECONDARY_CLICK = false;
    } if (event.button === 2) {
        CLICK_STARTED = getPixelCoordinates(event);
        CLICK_LAST_DRAG = CLICK_STARTED;
        CLICK_CURRENT_DRAG = CLICK_STARTED;
        SECONDARY_CLICK = true;
    }
})

document.addEventListener('mouseup', (event) => {
    event.preventDefault();
    const coordinates = getPixelCoordinates(event);
    if (!DRAGGING) {
        clickEvent = new GameClickEvent(SECONDARY_CLICK, coordinates);
    } else {
        dragEvent = new GameDragEvent(SECONDARY_CLICK, CLICK_LAST_DRAG, coordinates);
    }
    CLICK_STARTED = undefined;
    DRAGGING = false;
    CLICK_LAST_DRAG = undefined;
    CLICK_CURRENT_DRAG = undefined;
    SECONDARY_CLICK = false;
})

document.addEventListener('mousemove', (event) => {
    event.preventDefault();
    const coordinates = getPixelCoordinates(event);
    if (CLICK_STARTED) {
        DRAGGING = true;
        CLICK_CURRENT_DRAG = coordinates;
    } else {
        hoverEvent = new GameHoverEvent(SECONDARY_CLICK, coordinates);
    }
    MOUSE_ON_DOCUMENT = true;
})

document.addEventListener('mouseout', (event) => {
    event.preventDefault();
    MOUSE_ON_DOCUMENT = false;
})

document.addEventListener('wheel', (event) => {
    WHEEL += event.deltaY;
})

/**
 * Click event active in the current frame.
 * @type { GameClickEvent }
 */
export let clickEvent = undefined;

export class GameClickEvent extends GameEvent {
    /**
     * Whether this is a secondary click.
     * @type {boolean}
     */
    secondary;
    /**
     * Coordinates of the click.
     * @type {number}
     */
    coordinates;

    constructor(secondary, coordinates) {
        super();
        this.secondary = secondary;
        this.coordinates = coordinates;
    }

    cancel() {
        clickEvent = undefined;
    }
}

/**
 * Hover event active in the current frame.
 * @type { GameHoverEvent }
 */
export let hoverEvent = undefined;

export class GameHoverEvent extends GameEvent {
    /**
     * Coordinates of the cursor when hovering.
     * @type {number}
     */
    coordinates;

    constructor(secondary, coordinates) {
        super();
        this.secondary = secondary;
        this.coordinates = coordinates;
    }

    cancel() {
        hoverEvent = undefined;
    }
}

/**
 * Drag event active in the current frame.
 * @type { GameDragEvent }
 */
export let dragEvent = undefined;

export class GameDragEvent extends GameEvent {
    /**
     * Whether this is a secondary click.
     * @type {boolean}
     */
    secondary;
    /**
     * Coordinates of the click in the previous drag event.
     * @type {number}
     */
    from;
    /**
     * Coordinates of the click in the current drag event.
     * @type {number}
     */
    to;

    constructor(secondary, from, to) {
        super();
        this.secondary = secondary;
        this.from = from;
        this.to = to;
    }

    cancel() {
        dragEvent = undefined;
    }
}

/**
 * Wheel event active in the current frame.
 * @type { GameWheelEvent }
 */
export let wheelEvent = undefined;

export class GameWheelEvent extends GameEvent {
    /**
     * How much the wheel has scrolled in or out.
     * @type {number}
     */
    delta;

    constructor(delta) {
        super();
        this.delta = delta
    }

    cancel() {
        wheelEvent = undefined;
    }
}

const getPixelCoordinates = (event) => {
    return [Math.round(event.pageX * window.devicePixelRatio), Math.round(event.pageY * window.devicePixelRatio)];
}

export const updateMouseEvents = () => {
    clickEvent = undefined;
    if (!MOUSE_ON_DOCUMENT) {
        hoverEvent = undefined;
    }
    if (DRAGGING) {
        dragEvent = new GameDragEvent(SECONDARY_CLICK, CLICK_LAST_DRAG, CLICK_CURRENT_DRAG);
        CLICK_LAST_DRAG = CLICK_CURRENT_DRAG;
    }
    if (WHEEL !== 0) {
        wheelEvent = new GameWheelEvent(WHEEL);
    }
    WHEEL = 0;
}
