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
    this.deathSprite = null;

    //how many squares the actor can see
    this.sightradius = null;

    //current state of actor
    this.currentState = this.STATE.INERT;

    //TODO set movespeed for all actors to 1 grid square for now
    this.moveSpeed = 1;
};

Actor.prototype.STATE = {
    INERT: 0,
    ROAMING: 1,
    ALERT_TO_PLAYER: 2
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

Actor.prototype.meleeAttack = function (playerObj) {
    playerObj.takeDamage(this.meleeDmg);
};

// do actor turn actions
Actor.prototype.doAITurn = function (playerX, playerY) {

    console.log("actor turn");

};


/* MeleeEnemy (subclass of Actor)
    An enemy that attacks on contact with player */

var MeleeEnemy = function (hp, meleeDmg, x, y) {
    Actor.call(this, hp, meleeDmg, true, x, y);
};
MeleeEnemy.prototype = Object.create(Actor.prototype);
MeleeEnemy.prototype.constructor = MeleeEnemy;


/* Radsect (subclass of MeleeEnemy)
    Irradiated scorpion monster. */

var Radsect = function (meleeDmg, x, y) {
    MeleeEnemy.call(this, 20, meleeDmg, x, y);
    this.sightradius = 2;
    this.currentState = this.STATE.ROAMING;
};
Radsect.prototype = Object.create(MeleeEnemy.prototype);
Radsect.prototype.constructor = Radsect;


/* Cansquid (subclass of MeleeEnemy)
    Robosquid monster. */

var Cansquid = function (meleeDmg, x, y) {
    MeleeEnemy.call(this, 50, meleeDmg, x, y);
    this.sightradius = 4;
    this.currentState = this.STATE.ROAMING;
};
Cansquid.prototype = Object.create(MeleeEnemy.prototype);
Cansquid.prototype.constructor = Cansquid;