
import { drawSprite } from "../../graphics.js";
import { MENU_SELECTION_SPRITES } from "../../sprites.js";
import { clickEvent, hoverEvent } from "../events/game-mouse-event.js";
import { GameWindow } from "./game-window.js";

/**
 * Window corresponding to the selection menu.
 */
export class SelectionWindow extends GameWindow {
    /**
     * Building, feature or unit being selected.
     */
    object;

    constructor(view, object) {
        super(view, 200, 200, MENU_SELECTION_SPRITES.image.width, MENU_SELECTION_SPRITES.image.height);
    }

    render() {
        let clickCallback = undefined;
        let hoverCallback = undefined;
        drawSprite(
            MENU_SELECTION_SPRITES,
            [0, 0],
            [MENU_SELECTION_SPRITES.image.width, MENU_SELECTION_SPRITES.image.height],
            [this.x, this.y],
            [MENU_SELECTION_SPRITES.image.width, MENU_SELECTION_SPRITES.image.height],
            clickEvent?.coordinates,
            () => {
                clickCallback = undefined;
            },
            hoverEvent?.coordinates,
            () => {
                hoverCallback = undefined;
            }
        );
        if (clickCallback !== undefined) {
            clickCallback();
            clickCallback = undefined;
            clickEvent?.cancel();
        }
        if (hoverCallback !== undefined) {
            hoverCallback();
            hoverCallback = undefined;
            hoverEvent?.cancel();
        }
    }

    tick() {
        super.tick();
    }
}
