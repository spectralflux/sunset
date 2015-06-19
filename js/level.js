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

Level.prototype.tileListing = [{
        "name": "?",
        "isImpassible": false
    },
    {
        "name": "sand",
        "isImpassible": false
    },
    {
        "name": "rock",
        "isImpassible": true
    }
                               ];

// generate level
Level.prototype.init = function () {
    // build map
    var tilemapdata = new Array(this.worldSize);
    var i;
    for (i = 0; i < this.worldSize; i++) {
        tilemapdata[i] = getRandomInt(1, 3);
    };
    this.tilemapdata = tilemapdata;

    //populate actors a bit
    this.actors = new Array();
    for (i = 0; i < 4; i++) {
        this.actors.push(new Radsect(1, posPix(getRandomInt(2, 20), this.tileSize), posPix(getRandomInt(2, 20), this.tileSize)));
    }
};

// gets the array entry in tilemapdata from a grid x,y location
Level.prototype.getGridTile = function (xgrid, ygrid) {
    return (ygrid * this.width + xgrid);
}

Level.prototype.isTileImpassible = function (xgrid, ygrid) {
    var tile = this.getGridTile(xgrid, ygrid);
    return this.tileListing[this.tilemapdata[tile]]["isImpassible"];
}