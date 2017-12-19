'use strict';

const check = require('check-types');
const common = require('./../common');
const pageToGenerator = require('../utils/pageToGenerator');
const collectQueryParams = require('../utils/collectQueryParams');
const querystring = require('querystring');

const ENDPT = 'metrics';

const DELETE_QUERY_PARAMS = ['key', 'subject'];

/**
 * Metrics module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function metrics(context) {
    const obj = common(context, ENDPT);

    class MetricQueryBuilder {
        constructor(context) {
            this.context = context;

            // container for the query parameters
            this._params = {};
        }

        /**
         * Query by key
         * @param {string} key
         */
        key(key) {
            check.string(key, 'key must be a string');
            this._params.key = key;
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
         * Deletes all queried metrics
         * @param {object} userOpts option overrides for this request
         * @returns {Promise<object>} Promise that resolves to an object stating the number of deleted metrics
         */
        remove(userOpts) {
            const queryBy = collectQueryParams(this._params, DELETE_QUERY_PARAMS);

            if (Object.keys(queryBy).length === 0) {
                throw new Error('You must specify at least the "subject" or "key"');
            }

            return this.context.http.makeRequest({
                method: 'DELETE',
                url: `/v1/apps/${this.context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`
            }, userOpts);
        }
    }

    /**
     * Retrives metrics for a subject, returned as an array
     * @param {string} subject subject to retrieve the metrics for
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object[]>} Promise that resolves to a list of metrics
     */
    function getAllSubjectMetrics(subject, userOpts) {
        check.string(subject, 'subject must be a string');

        let array = [];
        let url = `/v1/apps/${context.applicationId}/${ENDPT}/${subject}`;

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
     * Retrives metrics for a subject, returned as an iterator
     * @param {string} subject subject to retrieve the metrics for
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    function* getSubjectMetricsIterator(subject, userOpts) {
        check.string(subject, 'subject must be a string');

        function pageFn() {
            let url = `/v1/apps/${context.applicationId}/${ENDPT}/${subject}`;
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
     * Retrieves a single metric for a subject by key
     * @param {string} subject subject to retrieve the metric for
     * @param {string} key metric key to retrive the metric for
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object>} Promise that resolves to a single metric
     */
    function getIndividualSubjectMetric(subject, key, userOpts) {
        check.string(subject, 'subject must be a string');
        check.string(key, 'key must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${subject}/${key}`
        }, userOpts);
    }

    /**
     * Sets up a delete/get request targeting metrics using query filters
     * @returns Returns an instance of the EventQueryBuilder class
     */
    function query() {
        return new MetricQueryBuilder(context);
    }

    return {
        getAll: obj.getAll,
        getIterator: obj.getIterator,
        create: obj.create,
        getAllSubjectMetrics,
        getSubjectMetricsIterator,
        getIndividualSubjectMetric,  // TODO: consider aliasing to "get"
        query
    };
};
