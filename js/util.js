/** util.js
 * 
 * A collection of global utility functions
 */

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// return the pixel value of a given grid position
function posPix(dim, tileSize) {
    return dim * tileSize;
}