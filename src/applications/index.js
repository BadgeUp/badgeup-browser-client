'use strict';

const pageToGenerator = require('./../utils/pageToGenerator');
const ENDPT = 'apps';

// API Keys module
// @param context: The context to make requests in. Basically, `this`
module.exports = function apiKeys(context) {

    // retrieve all applications
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
    function* getAll(userOpts) {
        function pageFn() {
            let url = `/v1/${ENDPT}/`;
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
        getAll
    };
};
