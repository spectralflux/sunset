/** load-state.js
 * 
 * GameState while game loading.
 * TODO: THIS STATE IS CURRENTLY UNUSED.
 */

var LoadingState = new KiwiLoadingScreen('LoadingState', 'PlayState', 'assets/img/loading/');
/**
* This preload method is responsible for preloading all your in game assets.
* @method preload
* @private
*/
LoadingState.preload = function () {
	 /*KiwiLoadingScreen.prototype.preload.call(this);*/

	this.addSpriteSheet('player', 'assets/firstaid.png', 32, 32);


};
