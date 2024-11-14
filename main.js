import { drawMap, drawSprite } from "./src/graphics.js";
import { Map } from "./src/map.js";
import { loadSprites, TILE_SPRITES } from "./src/sprites.js";

(async() => {
    await loadSprites();
    drawMap(new Map(4,8));
})();

window.addEventListener('touchmove', function (e) {
  // TODO
})
