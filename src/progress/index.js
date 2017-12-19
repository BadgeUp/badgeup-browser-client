'use strict';

const check = require('check-types');
const querystring = require('querystring');
const pageToGenerator = require('./../utils/pageToGenerator');
const collectQueryParams = require('../utils/collectQueryParams');
const ENDPT = 'progress';

const GET_QUERY_PARAMS = ['subject', 'achievementId'];

class ProgressQueryBuilder {
    constructor(context) {
        this.context = context;

        // container for the query parameters
        this._params = {};
    }

    /**
     * Query by achievement ID
     * @param {string} achievementId
     */
    achievementId(achievementId) {
        check.string(achievementId, 'achievementId must be a string');
        this._params.achievementId = achievementId;
        return this;
    }

    /**
     * Query by subject
     * @param {string} subject
     */
    subject(subject) {
        check.string(subject, 'subject must be a string');
        this._params.subject = subject;
        return this;
    }

    /**
     * Retrieve all queried progress objects, returned as an array
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object[]>} Promise that resolves to an array of progress objects
     */
    getAll(userOpts) {
        if (!this._params.subject) {
            throw new Error('subject must be provided');
        }

        const queryBy = collectQueryParams(this._params, GET_QUERY_PARAMS);

        let array = [];
        let url = `/v1/apps/${this.context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`;

        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                array = array.concat(body.data || []); // concatinate the new data

                url = body.pages.next;
                if (url) {
                    return pageFn();
                } else {
                    return array;
                }
            });
        };

        return pageFn();
    }

    /**
     * Retrieve all queried progress objects, returned as an iterator
     * @param {object} userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next progress object
     */
    *getIterator(userOpts) {
        if (!this._params.subject) {
            throw new Error('subject must be provided');
        }

        const queryBy = collectQueryParams(this._params, GET_QUERY_PARAMS);

        const pageFn = () => {
            let url = `/v1/apps/${this.context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };

        yield* pageToGenerator(pageFn());
    }
}

module.exports = function progress(context) {

    /**
     * @returns Returns an instance of the ProgressQueryBuilder class
     */
    function query() {
        return new ProgressQueryBuilder(context);
    }

    return {
        query
    };
};
