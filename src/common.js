'use strict';

const check = require('check-types');
const pageToGenerator = require('./utils/pageToGenerator');

// provides a set of common funcitonality that can be used on most endpoints
// @param context: The context to make requests in. Basically, `this`
// @param endpoint: The endpoint used for this common module
module.exports = function common(context, endpoint) {

    // retrieve object by ID
    // @param id ID of the object to retrieve
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves with the retrieved object
    function get(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${endpoint}/${id}`
        }, userOpts);
    }

    // retrieve all objects, returned as an iterator
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
    function* getAll(userOpts) {
        function pageFn() {
            let url = `/v1/apps/${context.applicationId}/${endpoint}`;
            return function() {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }

        yield* pageToGenerator(pageFn());
    }

    // retrieve all objects, returned as an array
    // @param userOpts: option overrides for this request
    // @return An iterator that returns promises that resolve with the next object
    function getList(userOpts) {
        let array = [];
        let url = `/v1/apps/${context.applicationId}/${endpoint}`;

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

    // updates the object by ID
    // @param id: ID of the object to be updated
    // @param updates: JSON patch updates
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to the updated object
    function update(id, updates, userOpts) {
        check.string(id, 'id must be a string');
        check.array(updates, 'updates must be an array');

        return context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v1/apps/${context.applicationId}/${endpoint}/${id}`
        }, userOpts);
    }

    // create a object
    // @param object
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to the provided object
    function create(object, userOpts) {
        check.object(object, 'object must be an object');

        return context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v1/apps/${context.applicationId}/${endpoint}`
        }, userOpts);
    }

    // deletes a object by ID
    // @param id
    // @param userOpts: option overrides for this request
    // @returns Returns a promise that resolves to the deleted object
    function remove(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${context.applicationId}/${endpoint}/${id}`
        }, userOpts);
    }

    return {
        get: get,
        getAll,
        getList,
        create,
        update,
        remove
    };
};