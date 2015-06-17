/* Player */
var Player = function () {
    this.x = 32;
    this.y = 32;
    this.hp = 10;
    this.dmg = 10;
};

Player.prototype.takeDamage = function (dmg) {
    this.hp = this.hp - dmg;
};