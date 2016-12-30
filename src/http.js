'use strict';

const defaults = require('lodash.defaultsdeep');
const got = require('./utils/gotWrapper');
const findOwnPackageJSON = require('./utils/findOwnPackageJSON');

const packageJSON = findOwnPackageJSON() || { name: '@badgeup/badgeup-node-client', version: 'unknown' };

// client library defaults
var requestDefaults = {
    json: true,
    timeout: 5000,
    baseUrl: 'https://api.useast1.badgeup.io', // default API endpoint
    headers: {
        'User-Agent': packageJSON.name + '/' + packageJSON.version + ' (https://www.badgeup.io/)',
        'Accept': 'application/json'
    }
};

class BadgeUpHttp {
    // Constructor for the HTTP stack for BadgeUp
    // @param globalOpts: Options from the user for BadgeUp as a whole.
    constructor(globalReqOpts) {
        this.globalReqOpts = globalReqOpts || {};
    }

    // Performs a HTTP request given the collective options
    // @param reqOpts: Request options from this library's functions.
    // @param userOpts: Option overrides from the user. Highest priority.
    // @return: Returns a Promise that resolves with the request data
    makeRequest(reqOpts, userOpts) {
        const options = defaults({}, userOpts, reqOpts, this.globalReqOpts, requestDefaults);

        // for internal unit tests
        if (options._validate) {
            options._validate(options);
        }

        // for internal unit tests
        if (options._payload) {
            return options._payload(options);
        }

        return got(options).then(function(response) {
            // TODO implement error response translation
            return response.body;
        });
    }

}

module.exports = BadgeUpHttp;
