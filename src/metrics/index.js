'use strict';

const check = require('check-types');
const common = require('./../common');
const ENDPT = 'metrics';

// Metrics module
// @param context: The context to make requests in. Basically, `this`
module.exports = function metrics(context) {
    const obj = common(context, ENDPT);

    // retrives metrics for a subject
    // @param subject: subject to retrieve the metrics for
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to a list of metrics
    function getSubjectMetrics(subject, userOpts) {
        check.string(subject, 'subject must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${subject}`
        }, userOpts).then(function(body) { return body.data; });
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
        create: obj.create,
        getSubjectMetrics,
        getIndividualSubjectMetric, // TODO: consider aliasing to "get"
        removeIndividualSubjectMetric // TODO: consider aliasing to "remove"
    };
};
