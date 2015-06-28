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

// return the grid value of a given pixel position
function posGrid(dim, tileSize) {
    return Math.floor(dim / tileSize);
}

// return +1 if a > b, else return -1 if a < b, if a === b return 0.
function getCardinality(a, b) {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }
}

// return if two objects are adjacent to each other (not including diagonally adjacent
function isAdjacent(x1, y1, x2, y2, tileSize) {
    //TODO complete this
    return false;
}