"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const check = __importStar(require("check-types"));
const url_1 = require("url");
const common_1 = require("../common");
const collectQueryParams_1 = require("../utils/collectQueryParams");
const pageToGenerator_1 = require("../utils/pageToGenerator");
const ENDPT = 'earnedachievements';
const AVAILABLE_QUERY_PARAMS = ['achievementId', 'subject', 'since', 'until'];
class EarnedAchievementQueryBuilder {
    constructor(context) {
        // container for the query parameters
        this.params = {};
        this.context = context;
    }
    /**
     * Query by achievement ID
     * @param achievementId
     */
    achievementId(achievementId) {
        check.assert.string(achievementId, 'achievementId must be a string');
        this.params.achievementId = achievementId;
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
            throw new Error('You must specify at least the "achievementId", "subject", "since", or "until"');
        }
        return new url_1.URLSearchParams(queryBy).toString();
    }
    /**
     * Retrieves queried earned achievements, returned as an array
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
     * Retrieves queried earned achievements, returned as an iterator
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
    /**
     * Delete all queried earned achievements
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an object stating the number of deleted earned achievements
     */
    remove(userOpts) {
        const queryBy = collectQueryParams_1.collectQueryParams(this.params, AVAILABLE_QUERY_PARAMS);
        const queryPart = this.buildQuery(queryBy);
        return this.context.http.makeRequest({
            method: 'DELETE',
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}?${queryPart}`
        }, userOpts);
    }
}
exports.EarnedAchievementQueryBuilder = EarnedAchievementQueryBuilder;
/**
 * Earned Achievements resource
 */
class EarnedAchievementsResource {
    /**
     * Construct the earned achievements resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.context = context;
        this.common = new common_1.Common(context, ENDPT);
    }
    /**
     * Retrieve an achievement by ID
     * @param id ID of the achievement to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    get(id, userOpts) {
        return this.common.get(id, userOpts);
    }
    /**
     * Retrieve all earned achievements, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    getIterator(userOpts) {
        return this.common.getIterator(userOpts);
    }
    /**
     * Retrieve all earned achievements, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of earned achievements
     */
    getAll(userOpts) {
        return this.common.getAll(userOpts);
    }
    /**
     * Delete an earned achievement by ID
     * @param id ID of the achievement to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted achievement
     */
    remove(id, userOpts) {
        return this.common.remove(id, userOpts);
    }
    /**
     * Sets up a request targeting earned achievements using query filters
     * @returns Returns an instance of the EarnedAchievementQueryBuilder class
     */
    query() {
        return new EarnedAchievementQueryBuilder(this.context);
    }
}
exports.EarnedAchievementsResource = EarnedAchievementsResource;
//# sourceMappingURL=index.js.map