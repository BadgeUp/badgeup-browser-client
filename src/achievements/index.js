'use strict';

const check = require('check-types');
const common = require('./../common');
const ENDPT = 'achievements';

/**
 * Achievements module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function achievements(context) {
    const obj = common(context, ENDPT);

    /**
     * Retrieves a list of criteria
     * @param id ID of the achievement to retrieve criteria for
     * @param userOpts: option overrides for this request
     * @returns Returns a promise that resolves with the list of criteria
     */
    function getAchievementCriteria(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${id}/criteria`
        }, userOpts).then(function(body) { return body.data; });
    }

    /**
     * Retrieves a list of awards
     * @param id ID of the achievement to retrieve criteria for
     * @param userOpts: option overrides for this request
     * @returns Returns a promise that resolves with the list of awards
     */
    function getAchievementAwards(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/${id}/awards`
        }, userOpts).then(function(body) { return body.data; });
    }

    obj.getAchievementCriteria = getAchievementCriteria;
    obj.getAchievementAwards = getAchievementAwards;
    return obj;
};
