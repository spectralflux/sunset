/** play-state.js
 *
 * GameState while game is running.
 */

PlayState = new Kiwi.State('PlayState');

/* PlayState constants. */
PlayState.TILE_SIZE = 32;
PlayState.WORLD_WIDTH = 20;
PlayState.WORLD_HEIGHT = 20;
PlayState.WORLD_SIZE = PlayState.WORLD_WIDTH * PlayState.WORLD_HEIGHT;
PlayState.UP_DIR = -1;
PlayState.DOWN_DIR = 1;
PlayState.LEFT_DIR = -1;
PlayState.RIGHT_DIR = 1;
PlayState.NO_MOVE_DIR = 0;
PlayState.WAIT_TIME = 10;
PlayState.NUM_GAME_LOG_LINES = 6;

/* PlayState scope variables */
PlayState.waitCounter;
PlayState.globalTurn;
PlayState.isPlayersTurn;
PlayState.player;
PlayState.level;

/* game log lines */
PlayState.gameLogLines;

PlayState.preload = function () {
    this.addSpriteSheet('player', 'assets/player.png', 32, 32);
    this.addSpriteSheet('radsect', 'assets/radsect.png', 32, 32);
    this.addSpriteSheet('cansquid', 'assets/cansquid.png', 32, 32);
    this.addSpriteSheet('greensplat', 'assets/greensplat.png', 32, 32);
    this.addSpriteSheet('oilsplat', 'assets/oilsplat.png', 32, 32);
    this.addSpriteSheet('stairsup', 'assets/stairsup.png', 32, 32);
    this.addSpriteSheet('stairsdown', 'assets/stairsdown.png', 32, 32);
    this.addSpriteSheet('tiles', 'assets/floormap.png', 32, 32);
};

PlayState.create = function () {
    this.game.stage.color = '111611';
    this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this);

    /**
     * Param 1 - Width of a single tile.
     * Param 2 - Height of a single tile.
     * Param 3 - Width of the whole map - in tiles.
     * Param 4 - Height of the whole map - in tiles.
     */
    this.tilemap.setTo(32, 32, PlayState.WORLD_WIDTH, PlayState.WORLD_HEIGHT);

    this.tilemap.createTileType(0);
    this.tilemap.createTileType(1);
    this.tilemap.createTileType(2);

    //initialize level
    this.level = new Level(PlayState.WORLD_WIDTH, PlayState.WORLD_HEIGHT, PlayState.WORLD_SIZE, PlayState.TILE_SIZE);
    this.level.init();

    //Create a new TileMapLayer
    this.tilemap.createNewLayer('Ground', this.textures.tiles, this.level.tilemapdata);

    //Add the Layer to the State to be Rendered.
    this.addChild(this.tilemap.layers[0]);

    //initialize actor sprites
    for (var i = 0; i < this.level.actors.length; i++) {
        if (this.level.actors[i] instanceof Radsect) {
            this.level.actors[i].sprite = new Kiwi.GameObjects.Sprite(this, this.textures.radsect, this.level.actors[i].x, this.level.actors[i].y)
            this.level.actors[i].deathSprite = this.textures.greensplat;
            this.addChild(this.level.actors[i].sprite);
        }
        if (this.level.actors[i] instanceof Cansquid) {
            this.level.actors[i].sprite = new Kiwi.GameObjects.Sprite(this, this.textures.cansquid, this.level.actors[i].x, this.level.actors[i].y)
            this.level.actors[i].deathSprite = this.textures.oilsplat;
            this.addChild(this.level.actors[i].sprite);
        }
    }

    //intialize interactables sprites
    for (var i = 0; i < this.level.interactables.length; i++) {
        if (this.level.interactables[i] instanceof StairsUp) {
            this.level.interactables[i].sprite = new Kiwi.GameObjects.Sprite(this, this.textures.stairsup, this.level.interactables[i].x, this.level.interactables[i].y)
            this.addChild(this.level.interactables[i].sprite);
        }
        if (this.level.interactables[i] instanceof StairsDown) {
            this.level.interactables[i].sprite = new Kiwi.GameObjects.Sprite(this, this.textures.stairsdown, this.level.interactables[i].x, this.level.interactables[i].y)
            this.addChild(this.level.interactables[i].sprite);
        }
    }

    //initialize player
    this.player = new Player();
    this.player.sprite = new Kiwi.GameObjects.Sprite(this, this.textures.player, 0, 0);
    this.addChild(this.player.sprite);

    var myKeyboard = this.game.input.keyboard;
    myKeyboard.justPressedRate = 5000;
    this.keyboard = myKeyboard;

    // Creating Keys
    this.rightKey = this.keyboard.addKey(Kiwi.Input.Keycodes.D);
    this.rightArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.RIGHT, true);

    this.leftKey = this.keyboard.addKey(Kiwi.Input.Keycodes.A);
    this.leftArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.LEFT, true);

    this.upKey = this.keyboard.addKey(Kiwi.Input.Keycodes.W);
    this.upArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.UP, true);

    this.downKey = this.keyboard.addKey(Kiwi.Input.Keycodes.S);
    this.downArrowKey = this.keyboard.addKey(Kiwi.Input.Keycodes.DOWN, true);

    this.globalTurn = 0;
    this.isPlayersTurn = true;
    this.waitCounter = 0;

    //start a new game log
    this.gameLog = new GameLog(this.game.DEBUG_MODE, this.NUM_GAME_LOG_LINES);
    this.initGameLog();

    //Console text
    this.consoleTitles = new Kiwi.HUD.Widget.TextField(this.game, 'SUNSET: APOCALYPSE SIMULATOR v0.0 >>>', 50, 660);
    this.game.huds.defaultHUD.addWidget(this.consoleTitles);
    this.consoleTitles.style.color = '#55EE11';
    this.consoleTitles.style.fontFamily = 'Geo';
};

PlayState.initGameLog = function () {
    var i;
    var logBaseHeight = 690;
    var lineWidth = 30;

    this.gameLogLines = [];
    for (i = 0; i < PlayState.NUM_GAME_LOG_LINES; i++) {
        this.gameLogLines[i] = new Kiwi.HUD.Widget.TextField(this.game, '', 50, logBaseHeight + i * lineWidth);
        this.game.huds.defaultHUD.addWidget(this.gameLogLines[i]);
        this.gameLogLines[i].style.color = '#00FF44';
        this.gameLogLines[i].style.fontFamily = 'Geo';
    }
}

//Specifically check whether a player move would "run over" an actor, to determine whether the player initiates a melee attack.
PlayState.checkForPlayerCollisionWithActors = function (playerXDir, playerYDir) {
    var isCollision = false;
    var oneSquare = posPix(1, PlayState.TILE_SIZE);
    for (var i = 0; i < this.level.actors.length; i++) {
        if (((this.level.actors[i].y === this.player.y) && (((this.level.actors[i].x === this.player.x + oneSquare) && (playerXDir === this.RIGHT_DIR)) ||
                ((this.level.actors[i].x === this.player.x - oneSquare) && (playerXDir === this.LEFT_DIR)))) ||
            ((this.level.actors[i].x === this.player.x) && (((this.level.actors[i].y === this.player.y - oneSquare) && (playerYDir === this.UP_DIR)) ||
                ((this.level.actors[i].y === this.player.y + oneSquare) && (playerYDir === this.DOWN_DIR))))) {
            this.level.actors[i].takeDamage(this.player.dmg);
            isCollision = true;

            this.gameLog.log("DMG: player damages actor, actor has " + this.level.actors[i].hp + " HP remaining.", this.gameLog.TYPE.DEBUG);
            if (this.level.actors[i].isDead()) {
                this.gameLog.log("Actor dead.", this.gameLog.TYPE.DEBUG);
                this.killActor(this.level.actors[i]);
            }
        }
    }
    return isCollision;
};

//checking for collisions with map elements that 
PlayState.checkForPlayerCollisionWithImpassibleMapTiles = function (playerXDir, playerYDir) {
    //player hit map bounds
    if (!this.isMoveInBounds(playerXDir, playerYDir)) {
        return true;
    }

    if (this.level.isTileImpassible(posGrid(this.player.x, this.TILE_SIZE) + playerXDir, posGrid(this.player.y, this.TILE_SIZE) + playerYDir)) {
        return true;
    } else {
        return false;
    }
}

PlayState.isMoveInBounds = function (playerXDir, playerYDir) {
    if ((posGrid(this.player.x, this.TILE_SIZE) + playerXDir < 0) || (posGrid(this.player.x, this.TILE_SIZE) + playerXDir > this.level.width) || (posGrid(this.player.y, this.TILE_SIZE) + playerYDir < 0) || (posGrid(this.player.y, this.TILE_SIZE) + playerYDir > this.level.height)) {
        return false;
    } else {
        return true;
    }
}

PlayState.movePlayer = function (xdir, ydir) {
    var isCollision = this.checkForPlayerCollisionWithActors(xdir, ydir) || this.checkForPlayerCollisionWithImpassibleMapTiles(xdir, ydir);

    if (isCollision != true) {
        this.player.x = this.player.x + (xdir * this.TILE_SIZE);
        this.player.y = this.player.y + (ydir * this.TILE_SIZE);
    }
    this.globalTurn++;

    if (this.game.DEBUG_MODE) {
        this.gameLog.log("Global Turn: " + this.globalTurn, this.gameLog.TYPE.DEBUG);
    }

    this.isPlayersTurn = false;
    this.waitCounter = this.WAIT_TIME;
};

PlayState.moveActors = function () {
    /* for (var i = 0; i < this.level.actors.length; i++) {
     this.level.actors[i].x = this.level.actors[i].x + posPix(getRandomInt(-1, 1), PlayState.TILE_SIZE);
     this.level.actors[i].y = this.level.actors[i].y + posPix(getRandomInt(-1, 1), PlayState.TILE_SIZE);
 }*/
};

// remove an actor from the actors list and destroy sprite.
PlayState.killActor = function (actor) {
    actor.sprite.destroy();
    this.level.actors.splice(this.level.actors.indexOf(actor), 1);
    var newSplat = new Kiwi.GameObjects.Sprite(this, actor.deathSprite, actor.x, actor.y);
    this.addChild(newSplat);
};

PlayState.doEnemyTurn = function () {
    this.moveActors();
    this.isPlayersTurn = true;
};

PlayState.updateGameLog = function () {
    var gameLogEntries = this.gameLog.tail(PlayState.NUM_GAME_LOG_LINES);
    var i;

    for (i = 0; i < gameLogEntries.length; i++) {
        //this.gameLogLines[i].text = gameLogEntries[gameLogEntries.length - 1 - i].message;
        this.gameLogLines[i].text = gameLogEntries[i].message;
    }
}

PlayState.update = function () {

    Kiwi.State.prototype.update.call(this);

    if (this.isPlayersTurn) {
        if (this.rightKey.isDown || this.rightArrowKey.isDown) {
            this.movePlayer(this.RIGHT_DIR, this.NO_MOVE_DIR);
        }

        if (this.leftKey.isDown || this.leftArrowKey.isDown) {
            this.movePlayer(this.LEFT_DIR, this.NO_MOVE_DIR);
        }

        if (this.upKey.isDown || this.upArrowKey.isDown) {
            this.movePlayer(this.NO_MOVE_DIR, this.UP_DIR);
        }
        if (this.downKey.isDown || this.downArrowKey.isDown) {
            this.movePlayer(this.NO_MOVE_DIR, this.DOWN_DIR);
        }
    } else {

        if (this.waitCounter > 0) {
            this.waitCounter--;
        } else {
            this.doEnemyTurn();
        }

    }

    this.player.sprite.x = this.player.x;
    this.player.sprite.y = this.player.y;

    for (var i = 0; i < this.level.actors.length; i++) {
        this.level.actors[i].sprite.x = this.level.actors[i].x;
        this.level.actors[i].sprite.y = this.level.actors[i].y;
    }

    this.updateGameLog();

};