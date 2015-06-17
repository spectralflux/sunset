/** items.js
 *
 * An object heirachy of items in the game.
 */

/* Item
    The base object for the heirarchy. */

var Item = function (rarity, cost) {
    this.rarity = rarity;
    this.cost = cost;
};


/* Weapon (subclass of Item)
    An item that can be used to attack */

var Weapon = function (rarity, cost, baseDamage) {
    Item.call(this, rarity, cost);
    this.baseDamage = baseDamage;
};
Weapon.prototype = Object.create(Item.prototype);
Weapon.prototype.constructor = Weapon;