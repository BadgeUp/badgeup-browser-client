'use strict';

const pageToGenerator = require('../utils/pageToGenerator');

const ENDPT = 'analytics';

// Analytics module
//
// USE OF THE ANALTYICS MODULE IS NOT RECOMMENDED (AT THIS TIME)
// THIS MODULE IS NOT SUBJECT TO ANY SLAS AND MAY BE CHANGED AT ANY TIME
//
// @param context: The context to make requests in. Basically, `this`
module.exports = function achievements(context) {
    // retrieve event analytics
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves with the retrieved object
    function eventsLast60Days(userOpts) {
        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/events/last-60-days`
        }, userOpts);
    }

    // retrieve subject analytics
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves with the retrieved object
    function subjectsLast60Days(userOpts) {
        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/subjects/last-60-days`
        }, userOpts);
    }

    // retrieve earned achievement analytics
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves with the retrieved object
    function earnedAchievementsLast60Days(userOpts) {
        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/earnedachievements/last-60-days`
        }, userOpts);
    }

    // retrieve subject summary list
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
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

    return {
        eventsLast60Days,
        subjectsLast60Days,
        earnedAchievementsLast60Days,
        getSubjectsSummaryIterator
    };
};
