'use strict';

const defaults = require('lodash.defaultsdeep');
const request = require('./utils/fetchWrapper');

const packageJSON = { name: '@badgeup/badgeup-browser-client', version: 'unknown' };

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
    /**
     * Constructor for the HTTP stack for BadgeUp
     * @param {object} globalReqOpts Options from the user for BadgeUp as a whole.
     */
    constructor(globalReqOpts) {
        this.globalReqOpts = globalReqOpts || {};
    }

    /**
     * Performs a HTTP request given the collective options
     * @param {object} reqOpts Request options from this library's functions.
     * @param {object} userOpts Option overrides from the user. Highest priority.
     * @return {Promise} Returns a Promise that resolves with the request data
     */
    makeRequest(reqOpts, userOpts) {
        const options = defaults({}, userOpts, reqOpts, this.globalReqOpts, requestDefaults);

        // for internal unit tests
        if (options._validate) {
            options._validate(options);
        }

        // for internal unit tests
        if (options._payload) {
            return Promise.resolve(options._payload(options));
        }

        return request(options).then(function(response) {
            // TODO implement error response translation
            return response.json();
        });
    }

}

module.exports = BadgeUpHttp;
