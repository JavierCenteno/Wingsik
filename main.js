import { drawFrame, getWindowSize, setCanvasSize } from "./src/graphics.js";
import { Map, ORIENTATION } from "./src/map.js";
import { loadSprites } from "./src/sprites.js";

const map = new Map(10,16);

(async() => {
    await loadSprites();
    drawFrame(map);
})();

window.addEventListener('resize', (event) => {
  setCanvasSize(getWindowSize());
  drawFrame(map);
}, true);

document.addEventListener('keyup', (e) => {
  switch(e.key) {
    case 's':
      // move view down
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
      }
      break;
    case 'w':
      // move view up
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
      }
      break;
    case 'a':
      // move view left
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
      }
      break;
    case 'd':
      // move view right
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          drawFrame(map);
          break;
      }
      break;
    case 'q':
      // rotate view clockwise
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.orientation = ORIENTATION.SOUTH_EAST;
          drawFrame(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.orientation = ORIENTATION.NORTH_EAST;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.orientation = ORIENTATION.SOUTH_WEST;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.orientation = ORIENTATION.NORTH_WEST;
          drawFrame(map);
          break;
      }
      break;
    case 'e':
      // rotate view counterclockwise
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.orientation = ORIENTATION.NORTH_WEST;
          drawFrame(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.orientation = ORIENTATION.SOUTH_WEST;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.orientation = ORIENTATION.NORTH_EAST;
          drawFrame(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.orientation = ORIENTATION.SOUTH_EAST;
          drawFrame(map);
          break;
      }
      break;
  }
})

window.addEventListener('touchmove', (e) => {
  // TODO
})
