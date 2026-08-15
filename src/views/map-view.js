import { CANVAS, drawColor, drawSprite, FILTERS } from "../graphics.js";
import { Building } from "../map/building.js";
import { Feature } from "../map/feature.js";
import { Map } from '../map/map.js';
import { GRANULAR_ORIENTATION, ORIENTATION } from "../map/orientation.js";
import { Unit } from "../map/unit.js";
import { TERRAIN_SPRITES } from "../sprites.js";
import { bubbleInsert, removeIfExists } from "../util/list-util.js";
import { KEY_BINDINGS, keyHeldDownEvents, keyPressedEvents } from "./events/game-keyboard-event.js";
import { clickEvent, dragEvent, wheelEvent } from "./events/game-mouse-event.js";
import { GameView } from "./game-view.js";
import { BuildWindow } from "./windows/build-window.js";
import { SelectionWindow } from "./windows/selection-window.js";

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 16;
export const BLOCK_HEIGHT = 8;

/**
 * A view of a map.
 */
export class MapView extends GameView {
    /**
     * Current map on display.
     * 
     * @type { Map }
     */
    map;
    /**
     * Current orientation of the map in the view.
     */
    orientation = ORIENTATION.NORTH_EAST;
    /**
     * In which tile of the map the view is currently centered.
     */
    centerTile = [0, 0, 0];

    zoomLevel = 1;
    /**
     * In which order the elements in the view are rendered for each orientation.
     * 
     * @type { { [orientation: ORIENTATION]: MapElement[] } }
     */
    renderOrder;
    /**
     * Over which tile the cursor is currently hovering.
     * 
     * @type { [number, number] }
     */
    hoveringOverTile = undefined;
    /**
     * Ghost of the building the player is currently trying to build.
     * 
     * @type { (Building | Feature)[]? }
     */
    newBuildingGhost = undefined;
    /**
     * Which building, feature or unit is currently selected.
     */
    selectedObject = undefined;
    /**
     * Windows that are open in the map.
     * 
     * @type { GameWindow[] }
     */
    windows = [];

    /**
     * 
     * @param {number} x Number of tiles along the x (west-east) axis. Positive x is east while negative x is west.
     * @param {number} y Number of tiles along the y (south-north) axis. Positive y is north while negative y is south.
     */
    constructor(x, y) {
        super();
        this.map = new Map(this, x, y);
        this.renderOrder = {};
        this.renderOrder[ORIENTATION.NORTH_EAST] = [];
        this.renderOrder[ORIENTATION.NORTH_WEST] = [];
        this.renderOrder[ORIENTATION.SOUTH_EAST] = [];
        this.renderOrder[ORIENTATION.SOUTH_WEST] = [];
    }

    moveDown(rate = 1) {
        switch (this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.NORTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
          }
    }

    moveUp(rate = 1) {
        switch (this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.NORTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
          }
    }

    moveLeft(rate = 1) {
        switch (this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.NORTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
        }
    }

    moveRight(rate = 1) {
        switch (this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.centerTile[0] += rate;
                this.centerTile[1] -= rate;
                break;
          case ORIENTATION.NORTH_WEST:
                this.centerTile[0] += rate;
                this.centerTile[1] += rate;
                break;
          case ORIENTATION.SOUTH_EAST:
                this.centerTile[0] -= rate;
                this.centerTile[1] -= rate;
                break;
          case ORIENTATION.SOUTH_WEST:
                this.centerTile[0] -= rate;
                this.centerTile[1] += rate;
                break;
        }
    }

    rotateClockwise() {
        switch (this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.orientation = ORIENTATION.SOUTH_EAST;
                break;
            case ORIENTATION.NORTH_WEST:
                this.orientation = ORIENTATION.NORTH_EAST;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.orientation = ORIENTATION.SOUTH_WEST;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.orientation = ORIENTATION.NORTH_WEST;
                break;
        }
    }

    rotateCounterclockwise() {
        switch (this.orientation) {
            case ORIENTATION.NORTH_EAST:
                this.orientation = ORIENTATION.NORTH_WEST;
                break;
            case ORIENTATION.NORTH_WEST:
                this.orientation = ORIENTATION.SOUTH_WEST;
                break;
            case ORIENTATION.SOUTH_EAST:
                this.orientation = ORIENTATION.NORTH_EAST;
                break;
            case ORIENTATION.SOUTH_WEST:
                this.orientation = ORIENTATION.SOUTH_EAST;
                break;
          }
    }

    increaseZoom(rate = 1) {
        this.zoomLevel = this.zoomLevel + rate;
        if (this.zoomLevel < 1) {
            this.zoomLevel = 1;
        }
        if (this.zoomLevel > 4) {
            this.zoomLevel = 4;
        }
    }

    decreaseZoom(rate = 1) {
        this.zoomLevel = this.zoomLevel - rate;
        if (this.zoomLevel < 1) {
            this.zoomLevel = 1;
        }
        if (this.zoomLevel > 4) {
            this.zoomLevel = 4;
        }
    }

    addToView(element) {
        /*
        We use bubbleInsert instead of binaryInsert because it may be possible that
        the comparison for a render order does not matter for a pivot, but it does
        matter for a different element (such as, should be placed before an earlier
        element or after a latter element), causing the binary insert to fail in
        specific edge cases.
        */
        this.renderOrder[ORIENTATION.NORTH_EAST] = bubbleInsert(
            this.renderOrder[ORIENTATION.NORTH_EAST],
            element,
            RENDER_ORDER_COMPARATOR_NE
        );
        this.renderOrder[ORIENTATION.NORTH_WEST] = bubbleInsert(
            this.renderOrder[ORIENTATION.NORTH_WEST],
            element,
            RENDER_ORDER_COMPARATOR_NW
        );
        this.renderOrder[ORIENTATION.SOUTH_EAST] = bubbleInsert(
            this.renderOrder[ORIENTATION.SOUTH_EAST],
            element,
            RENDER_ORDER_COMPARATOR_SE
        );
        this.renderOrder[ORIENTATION.SOUTH_WEST] = bubbleInsert(
            this.renderOrder[ORIENTATION.SOUTH_WEST],
            element,
            RENDER_ORDER_COMPARATOR_SW
        );
    }

    removeFromView(element) {
        removeIfExists(this.renderOrder[ORIENTATION.NORTH_EAST], element);
        removeIfExists(this.renderOrder[ORIENTATION.NORTH_WEST], element);
        removeIfExists(this.renderOrder[ORIENTATION.SOUTH_EAST], element);
        removeIfExists(this.renderOrder[ORIENTATION.SOUTH_WEST], element);
    }

    updateInView(element) {
        this.removeFromView(element);
        this.addToView(element);
    }

    tileCoordinatesToCanvasCoordinates([x, y, k], zoomLevel, reverseX, reverseY) {
        const reverseXMultiplier = reverseX ? -1 : 1;
        const reverseYMultiplier = reverseY ? -1 : 1;
        return [
            zoomLevel * (reverseXMultiplier * (TILE_WIDTH / 2) * (y - reverseXMultiplier * reverseYMultiplier * x)),
            zoomLevel * (reverseYMultiplier * (TILE_HEIGHT / 2) * (y + reverseXMultiplier * reverseYMultiplier * x) - (k * BLOCK_HEIGHT))
        ];
    }

    openBuildMenu() {
        this.closeBuildMenu();
        this.windows.push(new BuildWindow(this));
    }

    closeBuildMenu() {
        const index = this.windows.findIndex(w => w instanceof BuildWindow);
        if (index >= 0) {
            this.windows.splice(index, 1);
        }
    }

    openSelectionMenu(object) {
        this.windows.push(new SelectionWindow(this, object));
    }

    closeSelectionMenu() {
        const index = this.windows.findIndex(w => w instanceof SelectionWindow);
        if (index >= 0) {
            this.windows.splice(index, 1);
        }
    }

    buildBuildingGhost() {
        if (this.newBuildingGhost !== undefined && this.newBuildingGhost.length > 0 && !this.newBuildingGhost.some(b => !b.canBeBuilt())) {
            for(const b of this.newBuildingGhost) {
                if (b instanceof Building) {
                    this.map.buildings.push(b);
                } else if (b instanceof Feature) {
                    this.map.features.push(b);
                }
                this.updateInView(b);
            }
            this.newBuildingGhost = undefined;
        }
    }

    render() {
        drawColor(
            '#000000',
            [0, 0],
            [CANVAS.width, CANVAS.height],
            {
                clickEventCallback: () => {
                    if (!clickEvent.secondary) {
                        this.selectedObject = undefined;
                        this.closeBuildMenu();
                        this.newBuildingGhost?.forEach(b => this.removeFromView(b));
                        this.newBuildingGhost = undefined;
                    } else {
                        if (this.newBuildingGhost !== undefined) {
                            this.newBuildingGhost.forEach(b => this.removeFromView(b));
                            this.newBuildingGhost = undefined;
                        } else {
                            this.openBuildMenu();
                        }
                    }
                }
            }
        )
        let reverseX = this.orientation === ORIENTATION.SOUTH_EAST || this.orientation === ORIENTATION.NORTH_EAST;
        let reverseY = this.orientation === ORIENTATION.NORTH_WEST || this.orientation === ORIENTATION.NORTH_EAST;
        const centerTileRelativeCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates(this.centerTile, this.zoomLevel, reverseX, reverseY);
        const canvasCenter = [CANVAS.width / 2, CANVAS.height / 2];
        this.hoveringOverTile = undefined;
        // render the tiles
        // we start rendering from the top corner in the view
        for (
            let j = reverseY ? this.map.y - 1 : 0;
            reverseY ? j >= 0 : j < this.map.y;
            j += reverseY ? -1 : 1
        ) {
            for (
                let i = reverseX ? this.map.x - 1 : 0;
                reverseX ? i >= 0 : i < this.map.x;
                i += reverseX ? -1 : 1
            ) {
                const k = Math.min(this.map.heights[j][i], this.map.heights[j][i + 1], this.map.heights[j + 1][i], this.map.heights[j + 1][i + 1]);
                let spriteIndex = 0;
                switch (this.orientation) {
                    case ORIENTATION.NORTH_EAST:
                        spriteIndex =
                            1 * (this.map.heights[j + 1][i + 1] - k) +
                            4 * (this.map.heights[j + 1][i] - k) +
                            2 * (this.map.heights[j][i + 1] - k) +
                            8 * (this.map.heights[j][i] - k);
                        break;
                    case ORIENTATION.NORTH_WEST:
                        spriteIndex =
                            2 * (this.map.heights[j + 1][i + 1] - k) +
                            1 * (this.map.heights[j + 1][i] - k) +
                            8 * (this.map.heights[j][i + 1] - k) +
                            4 * (this.map.heights[j][i] - k);
                        break;
                    case ORIENTATION.SOUTH_EAST:
                        spriteIndex =
                            4 * (this.map.heights[j + 1][i + 1] - k) +
                            8 * (this.map.heights[j + 1][i] - k) +
                            1 * (this.map.heights[j][i + 1] - k) +
                            2 * (this.map.heights[j][i] - k);
                        break;
                    case ORIENTATION.SOUTH_WEST:
                        spriteIndex =
                            8 * (this.map.heights[j + 1][i + 1] - k) +
                            2 * (this.map.heights[j + 1][i] - k) +
                            4 * (this.map.heights[j][i + 1] - k) +
                            1 * (this.map.heights[j][i] - k);
                        break;
                }
                const tileCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates([i, j, k], this.zoomLevel, reverseX, reverseY);
                const tileCanvasLocation =
                    [
                        tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0],
                        tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1]
                    ];
                drawSprite(
                    TERRAIN_SPRITES,
                    [spriteIndex * TILE_WIDTH, 0],
                    [TILE_WIDTH, TERRAIN_SPRITES.image.height],
                    [tileCanvasLocation[0], tileCanvasLocation[1] - this.zoomLevel * TERRAIN_SPRITES.image.height],
                    [TILE_WIDTH * this.zoomLevel, TERRAIN_SPRITES.image.height * this.zoomLevel],
                    {
                        clickEventCallback: () => {
                            if (!clickEvent.secondary) {
                                if (this.newBuildingGhost !== undefined) {
                                    this.buildBuildingGhost();
                                }
                            } else {
                                if (this.newBuildingGhost !== undefined) {
                                    this.newBuildingGhost?.forEach(b => this.removeFromView(b));
                                    this.newBuildingGhost = undefined;
                                } else {
                                    this.openBuildMenu();
                                }
                            }
                        },
                        hoverInstantCallback: () => {
                            this.hoveringOverTile = [j, i];
                        }
                    }
                );
                if (this.map.terrain[j][i] !== undefined) {
                    let terrainSprites = this.map.terrain[j][i].sprite;
                    let adjacencyUp; // tile up of this tile in the view
                    let adjacencyUpLeft; // tile up and left of this tile in the view
                    let adjacencyUpRight; // tile up and right of this tile in the view
                    let adjacencyLeft; // tile left of this tile in the view
                    let adjacencyRight; // tile right of this tile in the view
                    let adjacencyDownLeft; // tile down and left of this tile in the view
                    let adjacencyDownRight; // tile down and right of this tile in the view
                    let adjacencyDown; // tile down of this tile in the view
                    /*
                         ^      // the direction of our orientation                                
                        <x>     // adjacencyUp
                      <x> <x>   // adjacencyUpLeft, adjacencyUpRight
                    <x> <x> <x> // adjacencyLeft, current tile, adjacencyRight
                      <x> <x>   // adjacencyDownLeft, adjacencyDownRight
                        <x>     // adjacencyDown
                    */
                    switch (this.orientation) {
                        case ORIENTATION.NORTH_EAST:
                            adjacencyUp = this.map.terrainAt(i + 1, j + 1) === this.map.terrain[j][i];
                            adjacencyUpLeft = this.map.terrainAt(i, j + 1) === this.map.terrain[j][i];
                            adjacencyUpRight = this.map.terrainAt(i + 1, j) === this.map.terrain[j][i];
                            adjacencyLeft = this.map.terrainAt(i - 1, j + 1) === this.map.terrain[j][i];
                            adjacencyRight = this.map.terrainAt(i + 1, j - 1) === this.map.terrain[j][i];
                            adjacencyDownLeft = this.map.terrainAt(i - 1, j) === this.map.terrain[j][i];
                            adjacencyDownRight = this.map.terrainAt(i, j - 1) === this.map.terrain[j][i];
                            adjacencyDown = this.map.terrainAt(i - 1, j - 1) === this.map.terrain[j][i];
                            break;
                        case ORIENTATION.NORTH_WEST:
                            adjacencyUp = this.map.terrainAt(i - 1, j + 1) === this.map.terrain[j][i];
                            adjacencyUpLeft = this.map.terrainAt(i - 1, j) === this.map.terrain[j][i];
                            adjacencyUpRight =this.map.terrainAt(i, j + 1) === this.map.terrain[j][i];
                            adjacencyLeft = this.map.terrainAt(i - 1, j - 1) === this.map.terrain[j][i];
                            adjacencyRight = this.map.terrainAt(i + 1, j + 1) === this.map.terrain[j][i];
                            adjacencyDownLeft = this.map.terrainAt(i, j - 1) === this.map.terrain[j][i];
                            adjacencyDownRight = this.map.terrainAt(i + 1, j) === this.map.terrain[j][i];
                            adjacencyDown = this.map.terrainAt(i + 1, j - 1) === this.map.terrain[j][i];
                            break;
                        case ORIENTATION.SOUTH_EAST:
                            adjacencyUp = this.map.terrainAt(i + 1, j - 1) === this.map.terrain[j][i];
                            adjacencyUpLeft = this.map.terrainAt(i + 1, j) === this.map.terrain[j][i];
                            adjacencyUpRight = this.map.terrainAt(i, j - 1) === this.map.terrain[j][i];
                            adjacencyLeft = this.map.terrainAt(i + 1, j + 1) === this.map.terrain[j][i];
                            adjacencyRight = this.map.terrainAt(i - 1, j - 1) === this.map.terrain[j][i];
                            adjacencyDownLeft = this.map.terrainAt(i, j + 1) === this.map.terrain[j][i];
                            adjacencyDownRight = this.map.terrainAt(i - 1, j) === this.map.terrain[j][i];
                            adjacencyDown = this.map.terrainAt(i - 1, j + 1) === this.map.terrain[j][i];
                            break;
                        case ORIENTATION.SOUTH_WEST:
                            adjacencyUp = this.map.terrainAt(i - 1, j - 1) === this.map.terrain[j][i];
                            adjacencyUpLeft = this.map.terrainAt(i, j - 1) === this.map.terrain[j][i];
                            adjacencyUpRight = this.map.terrainAt(i - 1, j) === this.map.terrain[j][i];
                            adjacencyLeft = this.map.terrainAt(i + 1, j - 1) === this.map.terrain[j][i];
                            adjacencyRight = this.map.terrainAt(i - 1, j + 1) === this.map.terrain[j][i];
                            adjacencyDownLeft = this.map.terrainAt(i + 1, j) === this.map.terrain[j][i];
                            adjacencyDownRight = this.map.terrainAt(i, j + 1) === this.map.terrain[j][i];
                            adjacencyDown = this.map.terrainAt(i + 1, j + 1) === this.map.terrain[j][i];
                            break;
                    }
                    let spriteIndex;
                    if(!adjacencyUpRight) {
                        if(!adjacencyUp) {
                            if(!adjacencyUpLeft) {
                                spriteIndex = 0;
                            } else {
                                spriteIndex = 1;
                            }
                        } else {
                            if(!adjacencyUpLeft) {
                                spriteIndex = 2;
                            } else {
                                spriteIndex = 3;
                            }
                        }
                    } else {
                        if(!adjacencyUp) {
                            if(!adjacencyUpLeft) {
                                spriteIndex = 4;
                            } else {
                                spriteIndex = 5;
                            }
                        } else {
                            if(!adjacencyUpLeft) {
                                spriteIndex = 6;
                            } else {
                                spriteIndex = 7;
                            }
                        }
                    }
                    drawSprite(
                        terrainSprites,
                        [spriteIndex * TILE_WIDTH, 0],
                        [TILE_WIDTH, terrainSprites.image.height],
                        [tileCanvasLocation[0], tileCanvasLocation[1] - this.zoomLevel * terrainSprites.image.height],
                        [TILE_WIDTH * this.zoomLevel, terrainSprites.image.height * this.zoomLevel],
                        {
                        clickEventCallback: () => {
                            if (!clickEvent.secondary) {
                                if (this.newBuildingGhost !== undefined) {
                                    this.buildBuildingGhost();
                                }
                            } else {
                                if (this.newBuildingGhost !== undefined) {
                                    this.newBuildingGhost?.forEach(b => this.removeFromView(b));
                                    this.newBuildingGhost = undefined;
                                } else {
                                    this.openBuildMenu();
                                }
                            }
                        },
                        hoverInstantCallback: () => {
                            this.hoveringOverTile = [j, i];
                        }
                    }
                    );
                    if(!adjacencyDownRight) {
                        if(!adjacencyRight) {
                            if(!adjacencyUpRight) {
                                spriteIndex = 8;
                            } else {
                                spriteIndex = 9;
                            }
                        } else {
                            if(!adjacencyUpRight) {
                                spriteIndex = 10;
                            } else {
                                spriteIndex = 11;
                            }
                        }
                    } else {
                        if(!adjacencyRight) {
                            if(!adjacencyUpRight) {
                                spriteIndex = 12;
                            } else {
                                spriteIndex = 13;
                            }
                        } else {
                            if(!adjacencyUpRight) {
                                spriteIndex = 14;
                            } else {
                                spriteIndex = 15;
                            }
                        }
                    }
                    drawSprite(
                        terrainSprites,
                        [spriteIndex * TILE_WIDTH, 0],
                        [TILE_WIDTH, terrainSprites.image.height],
                        [tileCanvasLocation[0], tileCanvasLocation[1] - this.zoomLevel * terrainSprites.image.height],
                        [TILE_WIDTH * this.zoomLevel, terrainSprites.image.height * this.zoomLevel],
                        {
                            clickEventCallback: () => {
                                if (!clickEvent.secondary) {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.buildBuildingGhost();
                                    }
                                } else {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.newBuildingGhost?.forEach(b => this.removeFromView(b));
                                        this.newBuildingGhost = undefined;
                                    } else {
                                        this.openBuildMenu();
                                    }
                                }
                            },
                            hoverInstantCallback: () => {
                                this.hoveringOverTile = [j, i];
                            }
                        }
                    );
                    if(!adjacencyDownLeft) {
                        if(!adjacencyDown) {
                            if(!adjacencyDownRight) {
                                spriteIndex = 16;
                            } else {
                                spriteIndex = 17;
                            }
                        } else {
                            if(!adjacencyDownRight) {
                                spriteIndex = 18;
                            } else {
                                spriteIndex = 19;
                            }
                        }
                    } else {
                        if(!adjacencyDown) {
                            if(!adjacencyDownRight) {
                                spriteIndex = 20;
                            } else {
                                spriteIndex = 21;
                            }
                        } else {
                            if(!adjacencyDownRight) {
                                spriteIndex = 22;
                            } else {
                                spriteIndex = 23;
                            }
                        }
                    }
                    drawSprite(
                        terrainSprites,
                        [spriteIndex * TILE_WIDTH, 0],
                        [TILE_WIDTH, terrainSprites.image.height],
                        [tileCanvasLocation[0], tileCanvasLocation[1] - this.zoomLevel * terrainSprites.image.height],
                        [TILE_WIDTH * this.zoomLevel, terrainSprites.image.height * this.zoomLevel],
                        {
                            clickEventCallback: () => {
                                if (!clickEvent.secondary) {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.buildBuildingGhost();
                                    }
                                } else {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.newBuildingGhost?.forEach(b => this.removeFromView(b));
                                        this.newBuildingGhost = undefined;
                                    } else {
                                        this.openBuildMenu();
                                    }
                                }
                            },
                            hoverInstantCallback: () => {
                                this.hoveringOverTile = [j, i];
                            }
                        }
                    );
                    if(!adjacencyUpLeft) {
                        if(!adjacencyLeft) {
                            if(!adjacencyDownLeft) {
                                spriteIndex = 24;
                            } else {
                                spriteIndex = 25;
                            }
                        } else {
                            if(!adjacencyDownLeft) {
                                spriteIndex = 26;
                            } else {
                                spriteIndex = 27;
                            }
                        }
                    } else {
                        if(!adjacencyLeft) {
                            if(!adjacencyDownLeft) {
                                spriteIndex = 28;
                            } else {
                                spriteIndex = 29;
                            }
                        } else {
                            if(!adjacencyDownLeft) {
                                spriteIndex = 30;
                            } else {
                                spriteIndex = 31;
                            }
                        }
                    }
                    drawSprite(
                        terrainSprites,
                        [spriteIndex * TILE_WIDTH, 0],
                        [TILE_WIDTH, terrainSprites.image.height],
                        [tileCanvasLocation[0], tileCanvasLocation[1] - this.zoomLevel * terrainSprites.image.height],
                        [TILE_WIDTH * this.zoomLevel, terrainSprites.image.height * this.zoomLevel],
                        {
                            clickEventCallback: () => {
                                if (!clickEvent.secondary) {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.buildBuildingGhost();
                                    }
                                } else {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.newBuildingGhost?.forEach(b => this.removeFromView(b));
                                        this.newBuildingGhost = undefined;
                                    } else {
                                        this.openBuildMenu();
                                    }
                                }
                            },
                            hoverInstantCallback: () => {
                                this.hoveringOverTile = [j, i];
                            }
                        }
                    );
                }
                if (this.map.resources[j][i] !== undefined) {
                    let resourceSprite = this.map.resources[j][i].sprite;
                    drawSprite(
                        resourceSprite,
                        [spriteIndex * TILE_WIDTH, 0],
                        [TILE_WIDTH, resourceSprite.image.height],
                        [tileCanvasLocation[0], tileCanvasLocation[1] - this.zoomLevel * resourceSprite.image.height],
                        [TILE_WIDTH * this.zoomLevel, resourceSprite.image.height * this.zoomLevel],
                        {
                            clickEventCallback: () => {
                                if (!clickEvent.secondary) {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.buildBuildingGhost();
                                    }
                                } else {
                                    if (this.newBuildingGhost !== undefined) {
                                        this.newBuildingGhost?.forEach(b => this.removeFromView(b));
                                        this.newBuildingGhost = undefined;
                                    } else {
                                        this.openBuildMenu();
                                    }
                                }
                            },
                            hoverInstantCallback: () => {
                                this.hoveringOverTile = [j, i];
                            }
                        }
                    );
                }
            }
        }
        if (this.newBuildingGhost !== undefined && this.newBuildingGhost.length > 0) {
            if (this.hoveringOverTile !== undefined) {
                const newBuildingGhostMinX = Math.min(...this.newBuildingGhost.map(b => b.minX));
                const newBuildingGhostMaxX = Math.min(...this.newBuildingGhost.map(b => b.maxX));
                const newBuildingGhostMinY = Math.min(...this.newBuildingGhost.map(b => b.minY));
                const newBuildingGhostMaxY = Math.min(...this.newBuildingGhost.map(b => b.maxY));
                const centerTileX = Math.round((newBuildingGhostMinX + newBuildingGhostMaxX) / 2);
                const centerTileY = Math.round((newBuildingGhostMinY + newBuildingGhostMaxY) / 2);
                let diffX = this.hoveringOverTile[1] - centerTileX;
                let diffY = this.hoveringOverTile[0] - centerTileY;
                if (newBuildingGhostMinX + diffX < 0) {
                    diffX = -newBuildingGhostMinX;
                }
                if (newBuildingGhostMinY + diffY < 0) {
                    diffY = -newBuildingGhostMinY;
                }
                if (newBuildingGhostMinX + diffX > this.map.maxX - 1) {
                    diffX = this.map.maxX - 1 - newBuildingGhostMinX;
                }
                if (newBuildingGhostMinY + diffY > this.map.maxY - 1) {
                    diffY = this.map.maxY - 1 - newBuildingGhostMinY;
                }
                this.newBuildingGhost.forEach(b => b.x += diffX);
                this.newBuildingGhost.forEach(b => b.y += diffY);
                this.newBuildingGhost.forEach(b => this.updateInView(b));
            } else {
                this.newBuildingGhost.forEach(b => this.removeFromView(b));
            }
        }
        // render the objects in the view
        for (let o of this.renderOrder[this.orientation]) {
            if (o instanceof Building || o instanceof Feature) {
                const topTileCoordinates = [o.x, o.y];
                let spriteColumn = 0;
                let spriteRow = o.getSpriteVariant();
                switch (this.orientation) {
                    case ORIENTATION.NORTH_EAST:
                        switch (o.orientation) {
                            case ORIENTATION.NORTH_EAST:
                                spriteColumn = 0;
                                topTileCoordinates[0] -= (o.type.sizeY - 1) / 2;
                                topTileCoordinates[1] += (o.type.sizeY - 1) / 2;
                                break;
                            case ORIENTATION.NORTH_WEST:
                                spriteColumn = 3;
                                topTileCoordinates[0] -= (o.type.sizeX - 1) / 2 + (o.type.sizeY - 1);
                                topTileCoordinates[1] += (o.type.sizeX - 1) / 2;
                                break;
                            case ORIENTATION.SOUTH_EAST:
                                spriteColumn = 1;
                                topTileCoordinates[0] -= (o.type.sizeX - 1) / 2;
                                topTileCoordinates[1] -= (o.type.sizeX - 1) / 2;
                                break;
                            case ORIENTATION.SOUTH_WEST:
                                spriteColumn = 2;
                                topTileCoordinates[0] -= (o.type.sizeY - 1) / 2 + (o.type.sizeX - 1);
                                topTileCoordinates[1] -= (o.type.sizeY - 1) / 2;
                                break;
                        }
                        break;
                    case ORIENTATION.NORTH_WEST:
                        switch (o.orientation) {
                            case ORIENTATION.NORTH_EAST:
                                spriteColumn = 1;
                                topTileCoordinates[0] += (o.type.sizeX - 1) / 2;
                                topTileCoordinates[1] -= (o.type.sizeX - 1) / 2;
                                break;
                            case ORIENTATION.NORTH_WEST:
                                spriteColumn = 0;
                                topTileCoordinates[0] -= (o.type.sizeY - 1) / 2;
                                topTileCoordinates[1] -= (o.type.sizeY - 1) / 2;
                                break;
                            case ORIENTATION.SOUTH_EAST:
                                spriteColumn = 2;
                                topTileCoordinates[0] += (o.type.sizeY - 1) / 2;
                                topTileCoordinates[1] -= (o.type.sizeY - 1) / 2 + (o.type.sizeX - 1);
                                break;
                            case ORIENTATION.SOUTH_WEST:
                                spriteColumn = 3;
                                topTileCoordinates[0] -= (o.type.sizeX - 1) / 2;
                                topTileCoordinates[1] -= (o.type.sizeX - 1) / 2 + (o.type.sizeY - 1);
                                break;
                        }
                        break;
                    case ORIENTATION.SOUTH_EAST:
                        switch (o.orientation) {
                            case ORIENTATION.NORTH_EAST:
                                spriteColumn = 3;
                                topTileCoordinates[0] += (o.type.sizeX - 1) / 2;
                                topTileCoordinates[1] += (o.type.sizeX - 1) / 2 + (o.type.sizeY - 1);
                                break;
                            case ORIENTATION.NORTH_WEST:
                                spriteColumn = 2;
                                topTileCoordinates[0] -= (o.type.sizeY - 1) / 2;
                                topTileCoordinates[1] += (o.type.sizeY - 1) / 2 + (o.type.sizeX - 1);
                                break;
                            case ORIENTATION.SOUTH_EAST:
                                spriteColumn = 0;
                                topTileCoordinates[0] += (o.type.sizeY - 1) / 2;
                                topTileCoordinates[1] += (o.type.sizeY - 1) / 2;
                                break;
                            case ORIENTATION.SOUTH_WEST:
                                spriteColumn = 1;
                                topTileCoordinates[0] -= (o.type.sizeX - 1) / 2;
                                topTileCoordinates[1] += (o.type.sizeX - 1) / 2;
                                break;
                        }
                        break;
                    case ORIENTATION.SOUTH_WEST:
                        switch (o.orientation) {
                            case ORIENTATION.NORTH_EAST:
                                spriteColumn = 2;
                                topTileCoordinates[0] += (o.type.sizeY - 1) / 2 + (o.type.sizeX - 1);
                                topTileCoordinates[1] += (o.type.sizeY - 1) / 2;
                                break;
                            case ORIENTATION.NORTH_WEST:
                                spriteColumn = 1;
                                topTileCoordinates[0] += (o.type.sizeX - 1) / 2;
                                topTileCoordinates[1] += (o.type.sizeX - 1) / 2;
                                break;
                            case ORIENTATION.SOUTH_EAST:
                                spriteColumn = 3;
                                topTileCoordinates[0] += (o.type.sizeX - 1) / 2 + (o.type.sizeY - 1);
                                topTileCoordinates[1] -= (o.type.sizeX - 1) / 2;
                                break;
                            case ORIENTATION.SOUTH_WEST:
                                spriteColumn = 0;
                                topTileCoordinates[0] += (o.type.sizeY - 1) / 2;
                                topTileCoordinates[1] -= (o.type.sizeY - 1) / 2;
                                break;
                        }
                        break;
                }
                const spriteTileCount = ((o.type.sizeX + o.type.sizeY) / 2);
                const singleSpriteWidth = spriteTileCount * TILE_WIDTH;
                const singleSpriteHeight = spriteTileCount * TILE_HEIGHT + o.type.sizeZ;
                const tileCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates([topTileCoordinates[0], topTileCoordinates[1], this.map.heights[o.y][o.x]], this.zoomLevel, reverseX, reverseY);
                const tileCanvasLocation =
                    [
                        tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0],
                        tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1] - this.zoomLevel * singleSpriteHeight
                    ];
                drawSprite(
                    o.type.sprite,
                    [spriteColumn * singleSpriteWidth, spriteRow * singleSpriteHeight],
                    [singleSpriteWidth, singleSpriteHeight],
                    tileCanvasLocation,
                    [singleSpriteWidth * this.zoomLevel, singleSpriteHeight * this.zoomLevel],
                    {
                        filter: this.newBuildingGhost?.includes(o) ? (o.canBeBuilt() ? FILTERS.GREEN : FILTERS.RED) : undefined,
                        clickEventCallback: () => {
                            if (!clickEvent.secondary) {
                                if (this.newBuildingGhost !== undefined) {
                                    this.buildBuildingGhost();
                                } else {
                                    this.selectedObject = o;
                                    this.openSelectionMenu(o);
                                }
                            } else {
                                if (this.newBuildingGhost !== undefined) {
                                    this.newBuildingGhost.forEach(b => this.removeFromView(b));
                                    this.newBuildingGhost = undefined;
                                } else {
                                    this.openBuildMenu();
                                }
                            }
                        }
                    }
                );
            } else if (o instanceof Unit) {
                const unitXDecimal = o.x % 1;
                const unitYDecimal = o.y % 1;
                const unitHeightA =
                    this.map.heights[Math.floor(o.y)][Math.floor(o.x)] * (1 - unitXDecimal) +
                    this.map.heights[Math.floor(o.y)][Math.ceil(o.x)] * (unitXDecimal);
                const unitHeightB =
                    this.map.heights[Math.ceil(o.y)][Math.floor(o.x)] * (1 - unitXDecimal) +
                    this.map.heights[Math.ceil(o.y)][Math.ceil(o.x)] * (unitXDecimal);
                const unitZ = unitHeightA * (1 - unitYDecimal) + unitHeightB * (unitYDecimal);
                const topTileCoordinates = [o.x, o.y, unitZ];
                let spriteColumn = 0;
                let spriteRow = o.getSpriteVariant();
                switch (this.orientation) {
                    case ORIENTATION.NORTH_EAST:
                        switch (o.orientation) {
                            case GRANULAR_ORIENTATION.NORTH_EAST:
                                spriteColumn = 0;
                                break;
                            case GRANULAR_ORIENTATION.EAST:
                                spriteColumn = 1;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_EAST:
                                spriteColumn = 2;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH:
                                spriteColumn = 3;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_WEST:
                                spriteColumn = 4;
                                break;
                            case GRANULAR_ORIENTATION.WEST:
                                spriteColumn = 5;
                                break;
                            case GRANULAR_ORIENTATION.NORTH_WEST:
                                spriteColumn = 6;
                                break;
                            case GRANULAR_ORIENTATION.NORTH:
                                spriteColumn = 7;
                                break;
                        }
                        topTileCoordinates[0] -= (Math.max(o.type.sizeX, o.type.sizeY)) - 0.5;
                        topTileCoordinates[1] -= 0.5;
                        break;
                    case ORIENTATION.NORTH_WEST:
                        switch (o.orientation) {
                            case GRANULAR_ORIENTATION.NORTH_EAST:
                                spriteColumn = 2;
                                break;
                            case GRANULAR_ORIENTATION.EAST:
                                spriteColumn = 3;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_EAST:
                                spriteColumn = 4;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH:
                                spriteColumn = 5;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_WEST:
                                spriteColumn = 6;
                                break;
                            case GRANULAR_ORIENTATION.WEST:
                                spriteColumn = 7;
                                break;
                            case GRANULAR_ORIENTATION.NORTH_WEST:
                                spriteColumn = 0;
                                break;
                            case GRANULAR_ORIENTATION.NORTH:
                                spriteColumn = 1;
                                break;
                        }
                        topTileCoordinates[0] -= 0.5;
                        topTileCoordinates[1] -= (Math.max(o.type.sizeX, o.type.sizeY)) - 0.5;
                        break;
                    case ORIENTATION.SOUTH_EAST:
                        switch (o.orientation) {
                            case GRANULAR_ORIENTATION.NORTH_EAST:
                                spriteColumn = 6;
                                break;
                            case GRANULAR_ORIENTATION.EAST:
                                spriteColumn = 7;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_EAST:
                                spriteColumn = 0;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH:
                                spriteColumn = 1;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_WEST:
                                spriteColumn = 2;
                                break;
                            case GRANULAR_ORIENTATION.WEST:
                                spriteColumn = 3;
                                break;
                            case GRANULAR_ORIENTATION.NORTH_WEST:
                                spriteColumn = 4;
                                break;
                            case GRANULAR_ORIENTATION.NORTH:
                                spriteColumn = 5;
                                break;
                        }
                        topTileCoordinates[0] -= 0.5;
                        topTileCoordinates[1] += (Math.max(o.type.sizeX, o.type.sizeY)) - 1.5;
                        break;
                    case ORIENTATION.SOUTH_WEST:
                        switch (o.orientation) {
                            case GRANULAR_ORIENTATION.NORTH_EAST:
                                spriteColumn = 4;
                                break;
                            case GRANULAR_ORIENTATION.EAST:
                                spriteColumn = 5;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_EAST:
                                spriteColumn = 6;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH:
                                spriteColumn = 7;
                                break;
                            case GRANULAR_ORIENTATION.SOUTH_WEST:
                                spriteColumn = 0;
                                break;
                            case GRANULAR_ORIENTATION.WEST:
                                spriteColumn = 1;
                                break;
                            case GRANULAR_ORIENTATION.NORTH_WEST:
                                spriteColumn = 2;
                                break;
                            case GRANULAR_ORIENTATION.NORTH:
                                spriteColumn = 3;
                                break;
                        }
                        topTileCoordinates[0] += (Math.max(o.type.sizeX, o.type.sizeY)) - 1.5;
                        topTileCoordinates[1] -= 0.5;
                        break;
                }
                const spriteTileCount = Math.max(o.type.sizeX, o.type.sizeY);
                const singleSpriteWidth = spriteTileCount * TILE_WIDTH;
                const singleSpriteHeight = spriteTileCount * TILE_HEIGHT + o.type.sizeZ;
                const tileCanvasCoordinates = this.tileCoordinatesToCanvasCoordinates([topTileCoordinates[0], topTileCoordinates[1], topTileCoordinates[2]], this.zoomLevel, reverseX, reverseY);
                const tileCanvasLocation =
                    [
                        tileCanvasCoordinates[0] - centerTileRelativeCanvasCoordinates[0] + canvasCenter[0],
                        tileCanvasCoordinates[1] - centerTileRelativeCanvasCoordinates[1] + canvasCenter[1] - this.zoomLevel * o.type.sprite.image.height
                    ];
                drawSprite(
                    o.type.sprite,
                    [spriteColumn * singleSpriteWidth, spriteRow * singleSpriteHeight],
                    [singleSpriteWidth, singleSpriteHeight],
                    tileCanvasLocation,
                    [singleSpriteWidth * this.zoomLevel, singleSpriteHeight * this.zoomLevel],
                    {
                        clickEventCallback: () => {
                            if (!clickEvent.secondary) {
                                if (this.newBuildingGhost !== undefined) {
                                    this.buildBuildingGhost();
                                } else {
                                    this.selectedObject = o;
                                    this.openSelectionMenu(o);
                                }
                            } else {
                                if (this.newBuildingGhost !== undefined) {
                                    this.newBuildingGhost.forEach(b => this.removeFromView(b));
                                    this.newBuildingGhost = undefined;
                                } else {
                                    this.openBuildMenu();
                                }
                            }
                        }
                    }
                );
            }
        }
        // render the windows
        for (let window of this.windows) {
            window.render();
        }
    }

    tick() {
        for (const window of this.windows) {
            window.tick();
        }
        for (const keyPressedEvent of keyPressedEvents) {
            switch (keyPressedEvent.key) {
                case KEY_BINDINGS.MOVE_DOWN:
                    this.moveDown();
                    keyPressedEvent.cancel();
                    break;
                case KEY_BINDINGS.MOVE_UP:
                    this.moveUp();
                    keyPressedEvent.cancel();
                    break;
                case KEY_BINDINGS.MOVE_LEFT:
                    this.moveLeft();
                    keyPressedEvent.cancel();
                    break;
                case KEY_BINDINGS.MOVE_RIGHT:
                    this.moveRight();
                    keyPressedEvent.cancel();
                    break;
                case KEY_BINDINGS.ROTATE_CLOCKWISE:
                    this.rotateClockwise();
                    keyPressedEvent.cancel();
                    break;
                case KEY_BINDINGS.ROTATE_COUNTERCLOCKWISE:
                    this.rotateCounterclockwise();
                    keyPressedEvent.cancel();
                    break;
                case KEY_BINDINGS.INCREASE_ZOOM:
                    this.increaseZoom();
                    keyPressedEvent.cancel();
                    break;
                case KEY_BINDINGS.DECREASE_ZOOM:
                    this.decreaseZoom();
                    keyPressedEvent.cancel();
                    break;
            }
        }
        for (const keyHeldDownEvent of keyHeldDownEvents) {
            switch (keyHeldDownEvent.key) {
                case KEY_BINDINGS.MOVE_DOWN:
                    this.moveDown();
                    keyHeldDownEvent.cancel();
                    break;
                case KEY_BINDINGS.MOVE_UP:
                    this.moveUp();
                    keyHeldDownEvent.cancel();
                    break;
                case KEY_BINDINGS.MOVE_LEFT:
                    this.moveLeft();
                    keyHeldDownEvent.cancel();
                    break;
                case KEY_BINDINGS.MOVE_RIGHT:
                    this.moveRight();
                    keyHeldDownEvent.cancel();
                    break;
            }
        }
        if (dragEvent) {
            this.moveLeft((dragEvent.to[0] - dragEvent.from[0]) / (TILE_WIDTH * this.zoomLevel));
            this.moveUp((dragEvent.to[1] - dragEvent.from[1]) / (TILE_HEIGHT * this.zoomLevel));
            dragEvent.cancel();
        }
        if (wheelEvent) {
            if (wheelEvent.delta < 0) {
                this.increaseZoom();
            } else if (wheelEvent.delta > 0) {
                this.decreaseZoom();
            }
            wheelEvent.cancel();
        }
        this.map.tick();
    }
}

/**
 * Given two elements A and B and assuming that the orientation is north east, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {MapElement} a An element
 * @param {MapElement} b An element
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_NE = (a, b) => {
    return (b.maxX < a.minX || b.maxY < a.minY) * -1 + (a.maxX < b.minX || a.maxY < b.minY) * 1;
}

/**
 * Given two elements A and B and assuming that the orientation is north west, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {MapElement} a An element
 * @param {MapElement} b An element
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_NW = (a, b) => {
    return (a.maxX < b.minX || b.maxY < a.minY) * -1 + (b.maxX < a.minX || a.maxY < b.minY) * 1;
}

/**
 * Given two elements A and B and assuming that the orientation is south east, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {MapElement} a An element
 * @param {MapElement} b An element
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_SE = (a, b) => {
    return (b.maxX < a.minX || a.maxY < b.minY) * -1 + (a.maxX < b.minX || b.maxY < a.minY) * 1;
}

/**
 * Given two elements A and B and assuming that the orientation is south west, returns:
 * - -1 if A should be rendered before B
 * - +1 if B should be rendered before A
 * - 0 if it doesn't matter.
 * 
 * @param {MapElement} a An element
 * @param {MapElement} b An element
 * @returns -1 if A should be rendered before B, +1 if B should be rendered before A, or 0 if it doesn't matter.
 */
const RENDER_ORDER_COMPARATOR_SW = (a, b) => {
    return (a.maxX < b.minX || a.maxY < b.minY) * -1 + (b.maxX < a.minX || b.maxY < a.minY) * 1;
}
