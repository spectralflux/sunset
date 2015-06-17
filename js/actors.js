/** actors.js
 *
 * An object heirachy of non-player actors in the game.
*/

/* Actor
    The base object for the heirarchy. */

var Actor = function (hp, meleeDmg, isHostile, x, y) {
    this.hp = hp;
    this.meleeDmg = meleeDmg;
    this.isHostile = isHostile;
    this.x = x;
    this.y = y;
    this.sprite = null;
};

// Death might be more than just 0 HP, so make this a function to check.
Actor.prototype.isDead = function () {
    if (this.hp <= 0) {
        return true;
    } else {
        return false;
    }

};

Actor.prototype.takeDamage = function (dmg) {
    this.hp = this.hp - dmg;
};


/* MeleeEnemy (subclass of Actor)
    An enemy that attacks on contact with player */

var MeleeEnemy = function (hp, meleeDmg, x, y) {
    Actor.call(this, hp, meleeDmg, true, x, y);
};
MeleeEnemy.prototype = Object.create(Actor.prototype);
MeleeEnemy.prototype.constructor = MeleeEnemy;


/* Radsect (subclass of Actor)
    Irradiated scorpion monster. */

var Radsect = function (meleeDmg, x, y) {
    MeleeEnemy.call(this, 20, meleeDmg, x, y);
};
Radsect.prototype = Object.create(MeleeEnemy.prototype);
Radsect.prototype.constructor = Radsect;
