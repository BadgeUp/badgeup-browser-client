'use strict';

const check = require('check-types');
const common = require('./../common');
const pageToGenerator = require('../utils/pageToGenerator');
const ENDPT = 'metrics';

// Metrics module
// @param context: The context to make requests in. Basically, `this`
module.exports = function metrics(context) {
    const obj = common(context, ENDPT);

    // retrives metrics for a subject, returned as an array
    // @param subject: subject to retrieve the metrics for
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to a list of metrics
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

    // retrives metrics for a subject, returned as an iterator
    // @param subject: subject to retrieve the metrics for
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
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

    // retrieves a single metric for a subject by key
    // @param subject: subject to retrieve the metric for
    // @param key: metric key to retrive the metric for
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to a single metric
    function getIndividualSubjectMetric(subject, key, userOpts) {
        check.string(subject, 'id must be a string');
        check.string(key, 'key must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${subject}/${key}`
        }, userOpts);
    }

    // deletes a single metric for a subject by key
    // @param subject: subject to retrieve the metric for
    // @param key: metric key to retrive the metric for
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to a single metric
    function removeIndividualSubjectMetric(subject, key, userOpts) {
        check.string(subject, 'id must be a string');
        check.string(key, 'key must be a string');

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${subject}/${key}`
        }, userOpts);
    }

    return {
        getAll: obj.getAll,
        getIterator: obj.getIterator,
        create: obj.create,
        getAllSubjectMetrics,
        getSubjectMetricsIterator,
        getIndividualSubjectMetric, // TODO: consider aliasing to "get"
        removeIndividualSubjectMetric // TODO: consider aliasing to "remove"
    };
};
