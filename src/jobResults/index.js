'use strict';

const check = require('check-types');
const collectQueryParams = require('../utils/collectQueryParams');
const querystring = require('querystring');
const pageToGenerator = require('../utils/pageToGenerator');

const ENDPT = 'jobresult';

const GET_QUERY_PARAMS = ['criterionId', 'subject', 'id', 'sort'];

/**
 * Earned Achievements module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function earnedAchievements(context) {
    class JobResultQueryBuilder {
        constructor(context) {
            this.context = context;

            // container for the query parameters
            this._params = {};
        }

        criterionId(criterionId) {
            check.string(criterionId, 'criterionId must be a string');
            this._params.criterionId = criterionId;
            return this;
        }

        subject(subject) {
            check.string(subject, 'subject must be a string');
            this._params.subject = subject;
            return this;
        }

        id(id) {
            check.string(id, 'id must be a string');
            this._params.id = id;
            return this;
        }

        sort(key, direction) {
            check.string(key, 'key must be a string');
            check.string(direction, 'direction must be a string');
            this._params.sort =`${key}:${direction}`;
            return this;
        }

        /**
         * Get all queried job results
         * @param {object} userOpts option overrides for this request
         * @returns Returns an iterator that returns promises that resolve with the next job result
         */
        *getIterator(userOpts) {
            const queryBy = collectQueryParams(this._params, GET_QUERY_PARAMS);

            function pageFn() {
                let url = `/v1/apps/${context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`;
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
         * Retrieve all queried job results, returned as an array
         * @param {object} userOpts option overrides for this request
         * @returns {Promise<object[]>} Promise that resolves to an array of job results
         */
        getAll(userOpts) {
            const queryBy = collectQueryParams(this._params, GET_QUERY_PARAMS);

            let array = [];
            let url = `/v1/apps/${context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`;

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
    }

    /**
     * Sets up a delete request targeting earned achievements using query filters
     * @returns Returns an instance of the JobResultQueryBuilder class
     */
    function query() {
        return new JobResultQueryBuilder(context);
    }

    return {
        query
    };
};
