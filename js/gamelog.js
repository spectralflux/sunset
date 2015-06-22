/** gamelog.js
 *
 * Game log.
 */

// Game log object.
var GameLog = function (isDebugMode, numLogLines) {
    var i;
    this.isDebugMode = isDebugMode;
    this.buffer = [];

    for (i = 0; i < numLogLines; i++) {
        this.buffer.push(new GameLogMessage('', this.TYPE.INFO));
    }
};

// enum of logging message types.
GameLog.prototype.TYPE = {
    INFO: 0,
    COMBAT: 1,
    DEBUG: 2,
    PLAYER_DAMAGE: 3
};

// log a message.
GameLog.prototype.log = function (message, type) {
    if (type === this.TYPE.DEBUG) {
        if (this.isDebugMode) {
            this.buffer.push(new GameLogMessage(message, type));
        }
    } else {
        this.buffer.push(new GameLogMessage(message, type));
    }
}

// return the tail of the log.
GameLog.prototype.tail = function (numEntries) {
    return this.buffer.slice(this.buffer.length - numEntries, this.buffer.length);
}


// A line in the game log.
var GameLogMessage = function (message, type) {
    this.message = message;
    this.type = type;
}