import { drawMap, clear, ORIENTATION } from "./src/graphics.js";
import { Map } from "./src/map.js";
import { loadSprites, TILE_SPRITES } from "./src/sprites.js";

const map = new Map(4,8);

(async() => {
    await loadSprites();
    drawMap(map);
})();

document.addEventListener('keyup', (e) => {
  switch(e.key) {
    case 's':
      // move view down
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
      }
      break;
    case 'w':
      // move view up
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
      }
      break;
    case 'a':
      // move view left
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] -= 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
      }
      break;
    case 'd':
      // move view right
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] += 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.centerTile[0] -= 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.centerTile[0] += 1;
          map.centerTile[1] -= 1;
          clear();
          drawMap(map);
          break;
      }
      break;
    case 'q':
      // rotate view clockwise
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.orientation = ORIENTATION.SOUTH_EAST;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.orientation = ORIENTATION.NORTH_EAST;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.orientation = ORIENTATION.SOUTH_WEST;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.orientation = ORIENTATION.NORTH_WEST;
          clear();
          drawMap(map);
          break;
      }
      break;
    case 'e':
      // rotate view counterclockwise
      switch(map.orientation) {
        case ORIENTATION.NORTH_EAST:
          map.orientation = ORIENTATION.NORTH_WEST;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.NORTH_WEST:
          map.orientation = ORIENTATION.SOUTH_WEST;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_EAST:
          map.orientation = ORIENTATION.NORTH_EAST;
          clear();
          drawMap(map);
          break;
        case ORIENTATION.SOUTH_WEST:
          map.orientation = ORIENTATION.SOUTH_EAST;
          clear();
          drawMap(map);
          break;
      }
      break;
  }
})

window.addEventListener('touchmove', (e) => {
  // TODO
})
