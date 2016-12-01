'use strict';

const check = require('check-types');
const pageToGenerator = require('./../utils/pageToGenerator');

const ENDPT = 'events';

// Events module
// @param context: The context to make requests in. Basically, `this`
module.exports = function Event(context) {
    // retrieve all events
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next event
    function* getAll(userOpts) {
        function pageFn() {
            let url = `/v1/apps/${context.applicationId}/${ENDPT}`;
            return function() {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }

        yield* pageToGenerator(pageFn());
    }

    // retrieve all events matching query options
    // @param reqOpts: query options object
    // @param userOpts: option overrides for context request
    // @return A Promise that resolves with all of the events
    // function query(queryOpts, reqOpts) {
    //     // recognized fields: key, since, subject, limit, sort
    //     var buildUrl = `v1/apps/${context.applicationId}/${base}`;
    //     buildUrl += url.format({
    //         query: queryOpts
    //     });
    //
    //     return context.http.makeRequest({
    //         url: buildUrl
    //     }, reqOpts).then(castToEvent);
    // }

    // create a event
    // @param eventId
    // @returns Returns a promise that resolves to the provided event
    function create(event, userOpts) {
        check.object(event, 'event must be an object');

        return context.http.makeRequest({
            method: 'POST',
            body: event,
            url: `/v1/apps/${context.applicationId}/${ENDPT}`
        }, userOpts);
    }

    return {
        getAll,
        create
    };
};
