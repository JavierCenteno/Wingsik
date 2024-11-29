import { loadSprites } from "./src/sprites.js";
import { game } from "./src/game.js";

(async() => {
    await loadSprites();
    game();
})();
