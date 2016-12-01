'use strict';

const check = require('check-types');
const pageToGenerator = require('./../utils/pageToGenerator');

const ENDPT = 'metrics';

// Metrics module
// @param context: The context to make requests in. Basically, `this`
module.exports = function Metric(context) {

    // retrieve a metric by ID
    // @param metricId
    // @returns Returns a promise that resolves to the provided metric
    function get(metricId, userOpts) {
        check.string(metricId, 'metricId must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${metricId}`
        }, userOpts);
    }

    // retrieve all metrics
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next metric
    function* getAll(userOpts) {
        function pageFn() {
            let url = `/v1/apps/${context.applicationId}/${ENDPT}`;
            return context.http.makeRequest({ url }, userOpts).then(function(body) {
                url = body.pages.next;
                return body;
            });
        }

        yield* pageToGenerator(pageFn);
    }

    // create a metric
    // @param metricId
    // @returns Returns a promise that resolves to the provided metric
    function create(metric, userOpts) {
        check.object(metric, 'metric must be an object');

        return context.http.makeRequest({
            method: 'POST',
            body: metric,
            url: `/v1/apps/${context.applicationId}/${ENDPT}`
        }, userOpts);
    }

    // updates the metric by ID
    // @param metricId: ID of the metric to be updated
    // @param updates: JSON patch updates
    // @returns Returns a promise that resolves to the updated metric
    function update(metricId, updates, userOpts) {
        check.string(metricId, 'metricId must be a string');

        return context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${metricId}`
        }, userOpts);
    }

    // deletes a metric by ID
    // @param metricId
    // @returns Returns a promise that resolves to the deleted metric
    function remove(metricId, userOpts) {
        check.string(metricId, 'metricId must be a string');

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${metricId}`
        }, userOpts);
    }

    return {
        get: get,
        getAll,
        create,
        update,
        remove
    };
};
