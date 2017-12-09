'use strict';

const common = require('./../common');
const ENDPT = 'apikeys';

/**
 * API Keys module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function apiKeys(context) {
    const obj = common(context, ENDPT);

    /**
     * Get all possible API key scopes
     * @param userOpts: option overrides for this request
     * @returns Returns a promise that resolves with the requested API key scopes
     */
    function listScopes(userOpts) {
        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/scopes`
        }, userOpts).then(function(body) { return body.data; });
    }

    return {
        getAll: obj.getAll,
        getIterator: obj.getIterator,
        create: obj.create,
        remove: obj.remove,
        update: obj.update,
        listScopes
    };
};
