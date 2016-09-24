'use strict';

// Metrics module
// @param context: The context to make requests in. Basically, `this`
module.exports = function Metric(context) {
    const base = 'metrics';

    // retrieve all metrics
    // @param userOpts: option overrides for this request
    // @return A Promise that resolves with all of the metrics
    function getAll(userOpts) {
        return context.http.makeRequest({
            url: `v1/apps/${context.applicationId}/${base}`
        }, userOpts);
    }

    return {
        getAll
    };
};
