'use strict';

const check = require('check-types');
const defaults = require('lodash.defaultsdeep');
const Http = require('./http');

class BadgeUp {
    constructor(globalOpts) {

        // these fields are required
        check.assert.object(globalOpts, 'You must provide an options object. Please see the documentation.');
        check.assert.string(globalOpts.applicationId, 'You must provide your applicationId.');
        if (!globalOpts.apiKey && !globalOpts.token) {
            throw new Error('Either globalOpts.apiKey or globalOpts.token must be an string');
        }

        // ensure the request options are an object if not defined
        globalOpts.request = defaults({}, globalOpts.request);
        globalOpts.request.headers = defaults({}, globalOpts.request.headers);

        // setup the application this client is pointing to
        this.applicationId = globalOpts.applicationId;

        // setup the Authorization header
        if (globalOpts.token) { // JWT bearer token
            globalOpts.request.headers.authorization = 'Bearer ' + globalOpts.token;
        } else if (globalOpts.apiKey) { // BadgeUp APIKey
            globalOpts.request.headers.authorization = 'Basic ' + Buffer.from(globalOpts.apiKey + ':');
        }

        // init the HTTP
        this.http = new Http(globalOpts.request);

        this.applications = require('./applications')(this);
        this.achievements = require('./achievements')(this);
        this._analytics = require('./analytics')(this);
        this.apiKeys = require('./apiKeys')(this);
        this.awards = require('./awards')(this);
        this.criteria = require('./criteria')(this);
        this.earnedAchievements = require('./earnedAchievements')(this);
        this.metrics = require('./metrics')(this);
        this.events = require('./events')(this);
    }
}

// add response objects for criteria evaluation
BadgeUp.response = require('./response');

module.exports = BadgeUp;
