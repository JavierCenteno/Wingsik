import { dragEvents } from "../events/game-mouse-event.js";

/**
 * A view of a window that can appear on top of another view.
 */
export class GameWindow {
    /**
     * View that this window belongs to.
     */
    view;
    /**
     * Horizontal coordinate of the location of this window in the view in pixels.
     * @type {number}
     */
    x;
    /**
     * Vertical coordinate of the location of this window in the view in pixels.
     * @type {number}
     */
    y;
    /**
     * Horizontal size of this window in the view in pixels.
     * @type {number}
     */
    width;
    /**
     * Vertical size of this window in the view in pixels.
     * @type {number}
     */
    height;

    constructor(view, x, y, width, height) {
        this.view = view;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    render() {
        console.error('Unimplemented method');
    }

    tick() {
        for (const dragEvent of dragEvents) {
            if(
                dragEvent.from[0] >= this.x && 
                dragEvent.from[0] <= this.x + this.width && 
                dragEvent.from[1] >= this.y && 
                dragEvent.from[1] <= this.y + this.height
            ) {
                this.x += dragEvent.to[0] - dragEvent.from[0];
                this.y += dragEvent.to[1] - dragEvent.from[1];
                dragEvent.cancel();
            }
        }
    }
}
