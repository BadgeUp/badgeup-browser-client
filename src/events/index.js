'use strict';

const check = require('check-types');
const common = require('./../common');
const difference = require('lodash.difference');
const querystring = require('querystring');
const ENDPT = 'events';

// Events module
// @param context: The context to make requests in. Basically, `this`
module.exports = function events(context) {
    const obj = common(context, ENDPT);

    // deletes an event by ID
    // @param id
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to the deleted object
    function remove(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${context.applicationId}/${ENDPT}?id=${id}`
        }, userOpts);
    }

    // deletes multiple events
    // @param deleteBy: options to delete events by
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to the deleted object
    function removeMultiple(deleteBy, userOpts) {
        check.string(deleteBy, 'deleteBy must be an object');

        const allowedKeys = ['id', 'since', 'until', 'subject', 'key'];
        const unallowedKeys = difference(Object.keys(deleteBy), allowedKeys);

        if (unallowedKeys.length > 0) {
            throw new Error('Unallowed keys: ' + unallowedKeys);
        }

        // convert dates
        if (check.date(deleteBy.since)) {
            deleteBy.since = deleteBy.since.toISOString();
        }

        if (check.date(deleteBy.until)) {
            deleteBy.until = deleteBy.until.toISOString();
        }

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${context.applicationId}/${ENDPT}?${querystring.stringify(deleteBy)}`
        }, userOpts);
    }

    // deletes all events
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to the deleted object
    function removeAll(userOpts) {

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${context.applicationId}/${ENDPT}?all=true`
        }, userOpts);
    }

    return {
        get: obj.get,
        getAll: obj.getAll,
        create: obj.create,
        remove,
        removeMultiple,
        removeAll
    };
};
