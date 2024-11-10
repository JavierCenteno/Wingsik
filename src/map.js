

export class Map {
    tiles;

    constructor(x, y) {
        this.tiles = [];
        for(let j = 0; j < y; ++j) {
            this.tiles.push([]);
            for(let i = 0; i < x; ++i) {
                this.tiles[j].push(0);
            }
        }
    }
}
