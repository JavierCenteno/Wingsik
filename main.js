import { drawFrame, getWindowSize, setCanvasSize } from "./src/graphics.js";
import { Map } from "./src/map.js";
import { loadSprites } from "./src/sprites.js";
import { View } from "./src/view.js";
import { KEY_BINDINGS } from "./src/input.js"

const view = new View(new Map(10,16));

(async() => {
    await loadSprites();
    drawFrame(view);
})();

window.addEventListener('resize', (event) => {
  setCanvasSize(getWindowSize());
  drawFrame(view);
}, true);

document.addEventListener('keyup', (event) => {
  switch(event.key) {
    case KEY_BINDINGS.MOVE_DOWN:
      view.moveDown();
      drawFrame(view);
      break;
    case KEY_BINDINGS.MOVE_UP:
      view.moveUp();
      drawFrame(view);
      break;
    case KEY_BINDINGS.MOVE_LEFT:
      view.moveLeft();
      drawFrame(view);
      break;
    case KEY_BINDINGS.MOVE_RIGHT:
      view.moveRight();
      drawFrame(view);
      break;
    case KEY_BINDINGS.ROTATE_CLOCKWISE:
      view.rotateClockwise();
      drawFrame(view);
      break;
    case KEY_BINDINGS.ROTATE_COUNTERCLOCKWISE:
      view.rotateCounterclockwise();
      drawFrame(view);
      break;
  }
})

window.addEventListener('touchmove', (e) => {
  // TODO
})
