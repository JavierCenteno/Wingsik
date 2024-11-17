import { drawFrame, getWindowSize, setCanvasSize } from "./src/graphics.js";
import { Map } from "./src/map.js";
import { View, ORIENTATION } from "./src/view.js"
import { loadSprites } from "./src/sprites.js";

const view = new View(new Map(10,16));

(async() => {
    await loadSprites();
    drawFrame(view);
})();

window.addEventListener('resize', (event) => {
  setCanvasSize(getWindowSize());
  drawFrame(view);
}, true);

document.addEventListener('keyup', (e) => {
  switch(e.key) {
    case 's':
      view.moveDown();
      drawFrame(view);
      break;
    case 'w':
      view.moveUp();
      drawFrame(view);
      break;
    case 'a':
      view.moveLeft();
      drawFrame(view);
      break;
    case 'd':
      view.moveRight();
      drawFrame(view);
      break;
    case 'q':
      view.rotateClockwise();
      drawFrame(view);
      break;
    case 'e':
      view.rotateCounterclockwise();
      drawFrame(view);
      break;
  }
})

window.addEventListener('touchmove', (e) => {
  // TODO
})
