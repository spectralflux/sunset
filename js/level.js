/** level.js
 *
 * Object representing a level in the game.
*/

var Level = function (width, height, worldSize, tileSize) {
    this.width = width;
    this.height = height;
    this.worldSize = worldSize;
    this.tileSize = tileSize;

    // the map itself
    this.tilemapdata = null;

    // all the actors on the map
    this.actors = null;
};

// generate level
Level.prototype.init = function () {
    // build map
    var tilemapdata = new Array(this.worldSize);
    for (var i = 0; i < this.worldSize; i++) {
        tilemapdata[i] = getRandomInt(1, 3);
    };
    this.tilemapdata = tilemapdata;

    //populate actors a bit
    this.actors = new Array();
    for (var i = 0; i < 4; i++) {
        this.actors.push(new Radsect(1, posPix(getRandomInt(2, 20), this.tileSize), posPix(getRandomInt(2, 20), this.tileSize)));
    }
};