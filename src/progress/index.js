'use strict';

const check = require('check-types');
const querystring = require('querystring');
const pageToGenerator = require('./../utils/pageToGenerator');
const collectQueryParams = require('../utils/collectQueryParams');
const ENDPT = 'progress';

const GET_QUERY_PARAMS = ['subject', 'achievementId'];

class ProgressQueryBuilder {
    constructor(context) {
        this.context = context;
    }

    achievementId(achievementId) {
        check.string(achievementId, 'achievementId must be a string');
        this.achievementId = achievementId;
        return this;
    }

    subject(subject) {
        check.string(subject, 'subject must be a string');
        this.subject = subject;
        return this;
    }

    // retrieve all queried progress objects, returned as an array
    // @param userOpts: option overrides for this request
    // @return A promise that resolves to an array of progress objects
    getAll(userOpts) {
        if (!this.subject) {
            throw new Error('subject must be provided');
        }

        const queryBy = collectQueryParams(this, GET_QUERY_PARAMS);

        let array = [];
        let url = `/v1/apps/${this.context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`;

        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                array = array.concat(body.data || []); // concatinate the new data

                url = body.pages.next;
                if (url) {
                    return pageFn();
                } else {
                    return array;
                }
            });
        };

        return pageFn();
    }

    // retrieve all queried progress objects, returned as an iterator
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next progress object
    *getIterator(userOpts) {
        if (!this.subject) {
            throw new Error('subject must be provided');
        }

        const queryBy = collectQueryParams(this, GET_QUERY_PARAMS);

        const pageFn = () => {
            let url = `/v1/apps/${this.context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };

        yield* pageToGenerator(pageFn());
    }
}

module.exports = function progress(context) {

    // Sets up a get request targeting progress objects
    // @returns Returns an instance of the ProgressQueryBuilder class
    function query() {
        return new ProgressQueryBuilder(context);
    }

    return {
        query
    };
};
