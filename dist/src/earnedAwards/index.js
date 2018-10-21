"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check = require("check-types");
const querystring = require("querystring");
const common_1 = require("../common");
const collectQueryParams_1 = require("../utils/collectQueryParams");
const pageToGenerator_1 = require("../utils/pageToGenerator");
const ENDPT = 'earnedawards';
const AVAILABLE_QUERY_PARAMS = ['subject', 'awardId', 'earnedAchievementId', 'since', 'until'];
class EarnedAwardQueryBuilder {
    constructor(context) {
        // container for the query parameters
        this.params = {};
        this.context = context;
    }
    /**
     * Query by award ID
     * @param awardId
     */
    awardId(awardId) {
        check.assert.string(awardId, 'awardId must be a string');
        this.params.awardId = awardId;
        return this;
    }
    /**
     * Query by earned achievement ID
     * @param earnedAchievementId
     */
    earnedAchievementId(earnedAchievementId) {
        check.assert.string(earnedAchievementId, 'earnedAchievementId must be a string');
        this.params.earnedAchievementId = earnedAchievementId;
        return this;
    }
    /**
     * Query by subject
     * @param subject
     */
    subject(subject) {
        check.assert.string(subject, 'subject must be a string');
        this.params.subject = subject;
        return this;
    }
    /**
     * Query by starting date (find after)
     * @param {Date} since
     */
    since(since) {
        check.assert.date(since, 'since must be a date');
        this.params.since = since.toISOString();
        return this;
    }
    /**
     * Query by ending date (find before)
     * @param {Date} until
     */
    until(until) {
        check.assert.date(until, 'until must be a date');
        this.params.until = until.toISOString();
        return this;
    }
    /**
     * Checks and builds query parameters for use in a URL
     * @returns Returns a string containing URL query parameters
     */
    buildQuery(queryBy) {
        if (Object.keys(queryBy).length === 0) {
            throw new Error('You must specify at least ' + AVAILABLE_QUERY_PARAMS.map(item => `"${item}"`).join(', '));
        }
        return querystring.stringify(queryBy);
    }
    /**
     * Retrieves queried earned awards, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a list of metrics
     */
    getAll(userOpts) {
        let array = [];
        const queryBy = collectQueryParams_1.collectQueryParams(this.params, AVAILABLE_QUERY_PARAMS);
        const queryPart = this.buildQuery(queryBy);
        const context = this.context;
        let url = `/v2/apps/${context.applicationId}/${ENDPT}?${queryPart}`;
        function pageFn() {
            return context.http.makeRequest({ url }, userOpts).then(function (body) {
                array = array.concat(body.data || []); // concatenate the new data
                url = body.pages.next;
                if (url) {
                    return pageFn();
                }
                else {
                    return array;
                }
            });
        }
        return pageFn();
    }
    /**
     * Retrieves queried earned awards, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts) {
        const queryBy = collectQueryParams_1.collectQueryParams(this.params, AVAILABLE_QUERY_PARAMS);
        const queryPart = this.buildQuery(queryBy);
        const context = this.context;
        function pageFn() {
            let url = `/v2/apps/${context.applicationId}/${ENDPT}?${queryPart}`;
            return function () {
                return context.http.makeRequest({ url }, userOpts).then(function (body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }
        yield* pageToGenerator_1.pageToGenerator(pageFn());
    }
}
exports.EarnedAwardQueryBuilder = EarnedAwardQueryBuilder;
/**
 * Earned Awards resource
 */
class EarnedAwardsResource {
    /**
     * Construct the earned award resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.context = context;
        this.common = new common_1.Common(context, ENDPT);
    }
    /**
     * Retrieve an earned award by ID
     * @param id ID of the earned award to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    get(id, userOpts) {
        return this.common.get(id, userOpts);
    }
    /**
     * Retrieve all earned awards, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    getIterator(userOpts) {
        return this.common.getIterator(userOpts);
    }
    /**
     * Retrieve all earned awards, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of earned awards
     */
    getAll(userOpts) {
        return this.common.getAll(userOpts);
    }
    /**
     * Sets up a request targeting earned awards using query filters
     * @returns Returns an instance of the EarnedAwardQueryBuilder class
     */
    query() {
        return new EarnedAwardQueryBuilder(this.context);
    }
}
exports.EarnedAwardsResource = EarnedAwardsResource;
//# sourceMappingURL=index.js.map