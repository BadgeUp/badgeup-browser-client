'use strict';

const path = require('path');

const MAX_DIRECTORIES = 5;

// Traverses upwards to find the closest package.json file
// returns the contents of the file as an object
function findOwnPackageJOSN() {
    var foundPackageJSON = {};
    var testLoc = __dirname; // current directory to test for a package.json
    for (var level = 0; level < MAX_DIRECTORIES; level++) {
        try {
            foundPackageJSON = require(testLoc + '/package.json');
            return foundPackageJSON;
        } catch (err) {
            /* do nothing */
        }
        testLoc = path.join(testLoc, '..');
    }
}

module.exports = findOwnPackageJOSN;
