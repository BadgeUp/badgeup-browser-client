'use strict';

const common = require('./../common');
const ENDPT = 'criteria';

// Criterion module
// @param context: The context to make requests in. Basically, `this`
module.exports = function criteria(context) {
    const obj = common(context, ENDPT);

    // Get a list of all dynamic criteria runtimes and image tags
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves with the requested dynamic criteria images
    function getDynamicCriteriaImages(userOpts) {
        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/dcimages`
        }, userOpts).then(body => body.data);
    }

    return {
        get: obj.get,
        getIterator: obj.getIterator,
        getAll: obj.getAll,
        create: obj.create,
        update: obj.update,
        remove: obj.remove,
        getDynamicCriteriaImages
    };
};
