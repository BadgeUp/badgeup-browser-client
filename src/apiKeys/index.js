'use strict';

const common = require('./../common');
const ENDPT = 'apikeys';

// API Keys module
// @param context: The context to make requests in. Basically, `this`
module.exports = function apiKeys(context) {
    const obj = common(context, ENDPT);

    // retrieve object by ID
    // @param id ID of the object to retrieve
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves with the retrieved object
    function listScopes(userOpts) {
        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/scopes`
        }, userOpts).then(function(body) { return body.data; });
    }

    return {
        getAll: obj.getAll,
        create: obj.create,
        remove: obj.remove,
        listScopes
    };
};
