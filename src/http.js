'use strict';

const defaults = require('lodash.defaults');
const got = require('got');
const path = require('path');

var packageJSON = findOwnPackageJOSN();

function findOwnPackageJOSN() {
    var foundPackageJSON = {};
    var testLoc = __dirname; // current directory to test for a package.json
    for (var level = 0; level < 5; level++) {
        try {
            foundPackageJSON = require(testLoc + '/package.json');
            return foundPackageJSON;
        } catch (err) {
            /* do nothing */
        }
        testLoc = path.join(testLoc, '..');
    }
}

// client library defaults
var requestDefaults = {
    json: true,
    timeout: 5000,
    baseUrl: 'https://api.badgeup.io',
    headers: {
        'User-Agent': packageJSON.name + ' ' + packageJSON.version,
        'Accept': 'application/json'
    }
};

class BadgeUpHttp {
    // Constructor for the HTTP stack for BadgeUp
    //@param globalOpts: Options from the user for BadgeUp as a whole.
    constructor(globalReqOpts) {
        this.globalReqOpts = globalReqOpts || {};
    }

    //@param reqOpts: Request options from this library's functions.
    //@param userOpts: Option overrides from the user. Highest priority.
    //@return: Returns a Promise that resolves with the request data
    makeRequest(reqOpts, userOpts) {
        return got(defaults({}, userOpts, reqOpts, this.globalReqOpts, requestDefaults));
    }

}

module.exports = BadgeUpHttp;
