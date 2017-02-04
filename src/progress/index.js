'use strict';

const check = require('check-types');
const pageToGenerator = require('./../utils/pageToGenerator');
const ENDPT = 'progress';

module.exports = function progress(context) {
    // retrieve all progress objects for a single subject, returned as an iterator
    // @param subject: The subject to get the progress for
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
    function* getIterator(subject, userOpts) {
        check.assert.string(subject, 'subject must be a string');

        function pageFn() {
            let url = `/v1/apps/${context.applicationId}/${ENDPT}?subject=${subject}`;
            return function() {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }

        yield* pageToGenerator(pageFn());
    }

    // retrieves all progress objects for a single subject, returned as an array
    // @param subject: The subject to get the progress for
    // @param userOpts: option overrides for this request
    // @return A promise that resolves to an array of progress objects
    function getAll(subject, userOpts) {
        check.assert.string(subject, 'subject must be a string');

        let array = [];
        let url = `/v1/apps/${context.applicationId}/${ENDPT}?subject=${subject}`;

        function pageFn() {
            return context.http.makeRequest({ url }, userOpts).then(function(body) {
                array = array.concat(body.data || []); // concatinate the new data

                url = body.pages.next;
                if (url) {
                    return pageFn();
                } else {
                    return array;
                }
            });
        }

        return pageFn();
    }

    // retrieves progress for a single subject and achievement
    // @param subject The subject to get progress for
    // @param achievementId The achievement to get progress for
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves with the progress object
    function getBySubjectAndAchievement(subject, achievementId, userOpts) {
        check.assert.string(subject, 'subject must be a string');
        check.assert.string(achievementId, 'achievementId must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${ENDPT}/?subject=${subject}&achievementId=${achievementId}`
        }, userOpts).then(function(body) { return body.data[0]; });
    }

    return {
        getAll,
        getIterator,
        getBySubjectAndAchievement
    };
};
