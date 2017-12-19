'use strict';

const common = require('./../common');
const ENDPT = 'achievementicons';

/**
 * Achievement icons module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function achievementIcons(context) {
    const obj = common(context, ENDPT);

    /**
     * Get all achievement icons
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object[]>} A promise that resolves to an array of achievement icon identifiers
     */
    function getAll(userOpts) {
        return context.http.makeRequest({
            method: 'GET',
            url: `/v1/apps/${context.applicationId}/${ENDPT}`
        }, userOpts);
    }

    return {
        getAll,
        remove: obj.remove
    };
};
