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
        console.error('Unimplemented method');
    }
}
