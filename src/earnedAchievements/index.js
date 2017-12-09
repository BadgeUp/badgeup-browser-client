'use strict';

const check = require('check-types');
const common = require('./../common');
const collectQueryParams = require('../utils/collectQueryParams');
const pageToGenerator = require('../utils/pageToGenerator');
const querystring = require('querystring');

const ENDPT = 'earnedachievements';

const AVAILABLE_QUERY_PARAMS = ['achievementId', 'subject', 'since', 'until'];

/**
 * Earned Achievements module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function earnedAchievements(context) {
    const obj = common(context, ENDPT);

    class EarnedAchievementQueryBuilder {
        constructor(context) {
            this.context = context;

            // container for the query parameters
            this._params = {};
        }

        achievementId(achievementId) {
            check.string(achievementId, 'achievementId must be a string');
            this._params.achievementId = achievementId;
            return this;
        }

        subject(subject) {
            check.string(subject, 'subject must be a string');
            this._params.subject = subject;
            return this;
        }

        since(since) {
            check.date(since, 'since must be a date');
            this._params.since = since.toISOString();
            return this;
        }

        until(until) {
            check.date(until, 'until must be a date');
            this._params.until = until.toISOString();
            return this;
        }

        /**
         * checks and builds query parameters for use in a URL
         * @returns Returns a string containing URL query paramters
         */
        _buildQuery(queryBy) {
            if (Object.keys(queryBy).length === 0) {
                throw new Error('You must specify at least the "achievementId", "subject", "since", or "until"');
            }

            return querystring.stringify(queryBy);
        }

        /**
         * retrives earned achievements, returned as an array
         * @param userOpts: option overrides for this request
         * @returns Returns a promise that resolves to a list of metrics
         */
        getAll(userOpts) {
            let array = [];
            const queryBy = collectQueryParams(this._params, AVAILABLE_QUERY_PARAMS);
            const queryPart = this._buildQuery(queryBy);

            let url = `/v1/apps/${context.applicationId}/${ENDPT}?${queryPart}`;

            function pageFn() {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    array = array.concat(body.data || []); // concatinate the new data

                    url = body.pages.next;
                    if (url) {
                        return pageFn();
                    } else {
                        return array;
                    }
                });
            }

            return pageFn();
        }

        /**
         * retrives earned achievements, returned as an iterator
         * @param userOpts: option overrides for this request
         * @return An iterator that returns promises that resolve with the next object
         */
        *getIterator(userOpts) {
            const queryBy = collectQueryParams(this._params, AVAILABLE_QUERY_PARAMS);
            const queryPart = this._buildQuery(queryBy);

            function pageFn() {
                let url = `/v1/apps/${context.applicationId}/${ENDPT}?${queryPart}`;
                return function() {
                    return context.http.makeRequest({ url }, userOpts).then(function(body) {
                        url = body.pages.next;
                        return body;
                    });
                };
            }

            yield* pageToGenerator(pageFn());
        }

        /**
         * delete all queried earned achievements
         * @param userOpts: option overrides for this request
         * @returns Returns a promise that resolves to an object stating the number of deleted metrics
         */
        remove(userOpts) {
            const queryBy = collectQueryParams(this._params, AVAILABLE_QUERY_PARAMS);
            const queryPart = this._buildQuery(queryBy);

            return this.context.http.makeRequest({
                method: 'DELETE',
                url: `/v1/apps/${this.context.applicationId}/${ENDPT}?${queryPart}`
            }, userOpts);
        }
    }

    /**
     * Sets up a delete request targeting earned achievements using query filters
     * @param queryBy: filters to query events by
     * @returns Returns an instance of the EarnedAchievementQueryBuilder class
     */
    function query() {
        return new EarnedAchievementQueryBuilder(context);
    }

    return {
        get: obj.get,
        getAll: obj.getAll,
        getIterator: obj.getIterator,
        remove: obj.remove,
        query
    };
};
