
import { drawSprite } from "../../graphics.js";
import { FarmBuilding, MineBuilding, TenementBuilding } from "../../map/building.js";
import { ORIENTATION } from "../../map/orientation.js";
import { BUILDING_FARM_ICON_SPRITES, BUILDING_MINE_ICON_SPRITES, BUILDING_TENEMENT_ICON_SPRITES, MENU_BUILD_SPRITES } from "../../sprites.js";
import { MapView } from "../map-view.js";
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
            [MENU_BUILD_SPRITES.image.width, MENU_BUILD_SPRITES.image.height]
        );
        drawSprite(
            BUILDING_FARM_ICON_SPRITES,
            [0, 0],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            [this.x + 10, this.y + 10],
            [BUILDING_FARM_ICON_SPRITES.image.width, BUILDING_FARM_ICON_SPRITES.image.height],
            {
                clickEventCallback: () => {
                    this.view.newBuildingGhost = new FarmBuilding(this.view.map, 0, 0, ORIENTATION.NORTH_EAST);
                    this.view.addToView(this.view.newBuildingGhost);
                }
            }
        );
        drawSprite(
            BUILDING_MINE_ICON_SPRITES,
            [0, 0],
            [BUILDING_MINE_ICON_SPRITES.image.width, BUILDING_MINE_ICON_SPRITES.image.height],
            [this.x + 10, this.y + 100],
            [BUILDING_MINE_ICON_SPRITES.image.width, BUILDING_MINE_ICON_SPRITES.image.height],
            {
                clickEventCallback: () => {
                    this.view.newBuildingGhost = new MineBuilding(this.view.map, 0, 0, ORIENTATION.NORTH_EAST);
                    this.view.addToView(this.view.newBuildingGhost);
                }
            }
        );
        drawSprite(
            BUILDING_TENEMENT_ICON_SPRITES,
            [0, 0],
            [BUILDING_TENEMENT_ICON_SPRITES.image.width, BUILDING_TENEMENT_ICON_SPRITES.image.height],
            [this.x + 10, this.y + 190],
            [BUILDING_TENEMENT_ICON_SPRITES.image.width, BUILDING_TENEMENT_ICON_SPRITES.image.height],
            {
                clickEventCallback: () => {
                    this.view.newBuildingGhost = new TenementBuilding(this.view.map, 0, 0, ORIENTATION.NORTH_EAST);
                    this.view.addToView(this.view.newBuildingGhost);
                }
            }
        );
    }

    tick() {
        super.tick();
    }
}
