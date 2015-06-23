/** interactables.js
 *
 * An object heirachy of interactable non-actor elements in the game.
 */

/* Interactable
    The base object for the heirarchy. */

var Interactable = function (x, y, isImpassible) {
    this.isImpassible = isImpassible;
    this.x = x;
    this.y = y;
    this.sprite = null;
};


/* StairsUp (subclass of Interactable)
    When collided with, player will go up levels */

var StairsUp = function (x, y) {
    Interactable.call(this, x, y, false);
};
StairsUp.prototype = Object.create(Interactable.prototype);
StairsUp.prototype.constructor = StairsUp;


/* StairsDown (subclass of Interactable)
    When collided with, player will go down levels */

var StairsDown = function (x, y) {
    Interactable.call(this, x, y, false);
};
StairsDown.prototype = Object.create(Interactable.prototype);
StairsDown.prototype.constructor = StairsDown;