import { loadSprites } from "./src/sprites.js";
import { game } from "./src/game.js";

(async() => {
    await loadSprites();
    game();
})();

/*
window.addEventListener('resize', (event) => {
  setCanvasSize(getWindowSize());
  drawFrame(view);
}, true);

window.addEventListener('touchmove', (e) => {
  // TODO
})
*/
