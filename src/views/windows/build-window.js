
import { drawSprite } from "../../graphics.js";
import { FarmBuilding } from "../../map/building.js";
import { MENU_BUILD_SPRITES, BUILDING_FARM_ICON_SPRITES } from "../../sprites.js";
import { ORIENTATION } from "../map-view.js";
import { GameWindow } from "./game-window.js";

/**
 * Window corresponding to the build menu.
 */
export class BuildWindow extends GameWindow {
    constructor(view) {
        super(view, 10, 10, MENU_BUILD_SPRITES.image.width, MENU_BUILD_SPRITES.image.height);
    }

    render() {
        drawSprite(
            MENU_BUILD_SPRITES,
            [0, 0],
            [MENU_BUILD_SPRITES.image.width, MENU_BUILD_SPRITES.image.height],
            [this.x, this.y],
            [MENU_BUILD_SPRITES.image.width, MENU_BUILD_SPRITES.image.height],
            undefined,
            undefined
        );
        drawSprite(
            BUILDING_FARM_ICON_SPRITES,
            [0, 0],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            [this.x + 10, this.y + 10],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            () => {
                this.view.newBuildingGhost = new FarmBuilding(0, 0, ORIENTATION.NORTH_EAST);
                this.view.addToView(this.view.newBuildingGhost);
            },
            undefined
        );
        drawSprite(
            BUILDING_FARM_ICON_SPRITES,
            [0, 0],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            [this.x + 10, this.y + 100],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            () => {
                this.view.newBuildingGhost = new FarmBuilding(0, 0, ORIENTATION.NORTH_EAST);
                this.view.addToView(this.view.newBuildingGhost);
            },
            undefined
        );
        drawSprite(
            BUILDING_FARM_ICON_SPRITES,
            [0, 0],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            [this.x + 10, this.y + 190],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            () => {
                this.view.newBuildingGhost = new FarmBuilding(0, 0, ORIENTATION.NORTH_EAST);
                this.view.addToView(this.view.newBuildingGhost);
            },
            undefined
        );
    }
}
