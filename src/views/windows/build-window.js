
import { drawSprite } from "../../graphics.js";
import { FarmBuilding } from "../../map/building.js";
import { MENU_BUILD_SPRITES } from "../../sprites.js";
import { ORIENTATION } from "../map-view.js";
import { GameWindow } from "./game-window.js";

/**
 * Window corresponding to the build menu.
 */
export class BuildWindow extends GameWindow {
    constructor(view) {
        super(view);
    }

    render() {
        drawSprite(
            MENU_BUILD_SPRITES,
            [0, 0],
            [MENU_BUILD_SPRITES.image.width, MENU_BUILD_SPRITES.image.height],
            [10, 10],
            [MENU_BUILD_SPRITES.image.width, MENU_BUILD_SPRITES.image.height],
            () => {
                this.view.newBuildingGhost = new FarmBuilding(0, 0, ORIENTATION.NORTH_EAST);
                this.view.addToView(this.view.newBuildingGhost);
            },
            undefined
        );
    }
}
