'use strict';

const Event = require('./Event.class');
const url = require('url');
const create = require('lodash.create');

// Event module
// @param context: The context to make requests in. Basically, `context`
module.exports = function Events(context) {
    const base = 'events';

    // retrieve all events
    // @param userOpts: option overrides for this request
    // @return A Promise that resolves with all of the metrics
    function getAll(reqOpts) {
        return context.http.makeRequest({
            url: `v1/apps/${context.applicationId}/${base}`
        }, reqOpts).then(castToEvent);
    }

    // retrieve all events matching query options
    // @param reqOpts: query options object
    // @param userOpts: option overrides for context request
    // @return A Promise that resolves with all of the metrics
    function query(queryOpts, reqOpts) {
        // recognized fields: key, since, subject, limit, sort
        var buildUrl = `v1/apps/${context.applicationId}/${base}`;
        buildUrl += url.format({
            query: queryOpts
        });

        return context.http.makeRequest({
            url: buildUrl
        }, reqOpts).then(castToEvent);
    }

    // convert a standard JSON obj to an instance of the Event class
    function castToEvent(events) {
        return events.map(function (event) {
            return create(Event.prototype, event);
        });
    }

    return {
        getAll,
        query
    };
};
