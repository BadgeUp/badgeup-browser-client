'use strict';

const check = require('check-types');
const defaults = require('lodash.defaultsdeep');
const BadgeUpHttp = require('./http');

const applications = require('./applications');
const achievements = require('./achievements');
const _analytics = require('./analytics');
const apiKeys = require('./apiKeys');
const awards = require('./awards');
const criteria = require('./criteria');
const earnedAchievements = require('./earnedAchievements');
const metrics = require('./metrics');
const events = require('./events');
const progress = require('./progress');
const jobResults = require('./jobResults');
const achievementIcons = require('./achievementIcons');

class BadgeUp {
    /**
     * Construct an instance of the BadgeUp client.
     * @param {{apiKey: string, token: string, applicationId: string, request: object }} globalOpts - Client and global options
     */
    constructor(globalOpts) {

        // these fields are required
        check.assert.object(globalOpts, 'You must provide an options object. Please see the documentation.');
        if (!globalOpts.apiKey && !globalOpts.token) {
            throw new Error('Either globalOpts.apiKey or globalOpts.token must be an string');
        }

        // ensure the request options are an object if not defined
        globalOpts.request = defaults({}, globalOpts.request);
        globalOpts.request.headers = defaults({}, globalOpts.request.headers);

        // setup the Authorization header
        if (globalOpts.token) { // JWT bearer token
            check.assert.string(globalOpts.applicationId, 'You must provide your applicationId.');
            // setup the application this client is pointing to
            this.applicationId = globalOpts.applicationId;
            globalOpts.request.headers.authorization = 'Bearer ' + globalOpts.token;
        } else if (globalOpts.apiKey) { // BadgeUp APIKey
            let applicationId;

            try {
                applicationId = JSON.parse(atob(globalOpts.apiKey)).applicationId;
                if (!applicationId) {
                    throw new Error('applicationId not present');
                }
                this.applicationId = applicationId;
            } catch (error) {
                throw new Error('Malformed API key');
            }

            globalOpts.request.headers.authorization = 'Basic ' + btoa(globalOpts.apiKey + ':');
        }

        /**
         * @member {BadgeUpHttp}
         */
        this.http = new BadgeUpHttp(globalOpts.request);

        this.applications = applications(this);
        this.achievements = achievements(this);
        this._analytics = _analytics(this);
        this.apiKeys = apiKeys(this);
        this.awards = awards(this);
        this.criteria = criteria(this);
        this.earnedAchievements = earnedAchievements(this);
        this.metrics = metrics(this);
        this.events = events(this);
        this.progress = progress(this);
        this.jobResults = jobResults(this);
        this.achievementIcons = achievementIcons(this);
    }
}

// add response objects for criteria evaluation
BadgeUp.response = require('./response');

module.exports = BadgeUp;
