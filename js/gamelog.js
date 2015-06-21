/** gamelog.js
 *
 * Game log.
 */

// Game log object.
var GameLog = function (isDebugMode) {
    this.isDebugMode = isDebugMode;
    this.buffer = [];
};

// enum of logging message types.
GameLog.prototype.TYPE = {
    INFO: 0,
    COMBAT: 1,
    DEBUG: 2
};

// log a message.
GameLog.prototype.log = function (message, type) {
    if (type === this.TYPE.DEBUG) {
        if (this.isDebugMode) {
            this.buffer.push(new GameLogMessage(message, type));
            //console.log(message);
        }
    } else {
        this.buffer.push(new GameLogMessage(message, type));
        //console.log(message);
    }
}


// A line in the game log.
var GameLogMessage = function (message, type) {
    this.message = message;
    this.type = type;
}