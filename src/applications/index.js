'use strict';

const check = require('check-types');
const pageToGenerator = require('./../utils/pageToGenerator');
const ENDPT = 'apps';

// API Keys module
// @param context: The context to make requests in. Basically, `this`
module.exports = function applications(context) {
    // create an application
    // @param object
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
    function create(object, userOpts) {
        check.object(object, 'object must be an object');

        return context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v1/${ENDPT}`
        }, userOpts);
    }

    // retrieve all applications
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
    function* getIterator(userOpts) {
        function pageFn() {
            let url = `/v1/${ENDPT}`;
            return function() {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }

        yield* pageToGenerator(pageFn());
    }

    return {
        getIterator,
        create
    };
};
