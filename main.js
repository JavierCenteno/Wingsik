import { drawSprite } from "./src/graphics.js";
import { TILE_SPRITES, loadSprites } from "./src/sprites.js";

(async() => {
    await loadSprites();
    drawSprite(TILE_SPRITES, [0,0])
})();

window.addEventListener('touchmove', function (e) {
  // TODO
})
