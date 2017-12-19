'use strict';

const check = require('check-types');
const pageToGenerator = require('../utils/pageToGenerator');

const ENDPT = 'analytics';

/**
 * Analytics module
 * USE OF THE ANALTYICS MODULE IS NOT RECOMMENDED (AT THIS TIME)
 * THIS MODULE IS NOT SUBJECT TO ANY SLAS AND MAY BE CHANGED AT ANY TIME
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function achievements(context) {
    /**
     * Retrieve event analytics
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object>} Promise that resolves with the retrieved object
     */
    function eventsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/events/last-n-days?duration=${numDays}`
        }, userOpts);
    }

    /**
     * Retrieve event analytics for a single subject
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object>} Promise that resolves with the retrieved object
     */
    function eventsLastNDaysBySubject(numDays, subject, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');
        check.string(subject, 'subject must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/events/last-n-days/subject/${subject}?duration=${numDays}`
        }, userOpts);
    }

    /**
     * Retrieve subject analytics
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object>} Promise that resolves with the retrieved object
     */
    function subjectsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/subjects/last-n-days?duration=${numDays}`
        }, userOpts);
    }

    /**
     * Retrieve new subject analytics
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object>} Promise that resolves with the retrieved object
     */
    function newSubjectsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/subjects/new/last-n-days?duration=${numDays}`
        }, userOpts);
    }

    /**
     * Retrieve earned achievement analytics
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object>} Promise that resolves with the retrieved object
     */
    function earnedAchievementsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/earnedachievements/last-n-days?duration=${numDays}`
        }, userOpts);
    }

    /**
     * Retrieve subject summary list
     * @param {object} userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    function* getSubjectsSummaryIterator(userOpts) {
        function pageFn() {
            let url = `/v1/apps/${context.applicationId}/${ENDPT}/subjects/summary`;
            return function() {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }

        yield* pageToGenerator(pageFn());
    }

    /**
     * Retrieve a list of unique metric keys
     * @param {object} userOpts option overrides for this request
     * @returns {Promise<object>} Promise that resolves with an array of retrieved metric keys
     */
    function getAllMetricKeys(userOpts) {
        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/metrics/keys`
        }, userOpts).then(obj => obj.data);
    }

    return {
        eventsLastNDays,
        eventsLastNDaysBySubject,
        subjectsLastNDays,
        newSubjectsLastNDays,
        earnedAchievementsLastNDays,
        getSubjectsSummaryIterator,
        getAllMetricKeys
    };
};
