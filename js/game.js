/** game.js
 *
 * Starts the kiwi.js game.
 */

var gameOptions = {
    width: 640,
    height: 900
}

var game = new Kiwi.Game('content', 'Sunset', null, gameOptions);

game.states.addState(PlayState);
game.states.switchState("PlayState");

// global debug flag
game.DEBUG_MODE = true;
if (game.DEBUG_MODE) {
    console.warn("DEBUG MODE ACTIVE")
}