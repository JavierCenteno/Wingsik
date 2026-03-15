/**
 * A view of a window that can appear on top of another view.
 */
export class GameWindow {
    /**
     * View that this window belongs to.
     */
    view;

    constructor(view) {
        this.view = view;
    }

    render() {
        console.error('Unimplemented method');
    }
}
