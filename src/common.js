'use strict';

const check = require('check-types');
const pageToGenerator = require('./utils/pageToGenerator');

/**
 * Provides a set of common funcitonality that can be used on most endpoints
 * @param {object} context The context to make requests in. Basically, `this`
 * @param {string} endpoint The endpoint used for this common module
 */
module.exports = function common(context, endpoint) {

    /**
     * Retrieve resource object by ID
     * @param {string} id ID of the object to retrieve
     * @param {object} userOpts option overrides for this request
     * @returns Returns a promise that resolves with the retrieved object
     */
    function get(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            url: `/v1/apps/${context.applicationId}/${endpoint}/${id}`
        }, userOpts);
    }

    /**
     * Retrieve all objects, returned as an iterator
     * @param {Object} userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    function* getIterator(userOpts) {
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

    /**
     * Retrieve all objects, returned as an array
     * @param {Object} userOpts option overrides for this request
     * @return A promise that resolves to an array of objects
     */
    function getAll(userOpts) {
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

    /**
     * Updates a resource by ID
     * @param {string} id ID of the object to be updated
     * @param {Array<object>} updates JSON patch updates
     * @param {Object} userOpts option overrides for this request
     * @returns {Promise<Object>} A promise that resolves to the updated object
     */
    function update(id, updates, userOpts) {
        check.string(id, 'id must be a string');
        check.array(updates, 'updates must be an array');

        return context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v1/apps/${context.applicationId}/${endpoint}/${id}`
        }, userOpts);
    }

    /**
     * Create a object
     * @param {Object} object Sub-resource to object to create
     * @param {Object} userOpts option overrides for this request
     * @returns {Promise<Object>} A promise that resolves to the provided object
     */
    function create(object, userOpts) {
        check.object(object, 'object must be an object');

        return context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v1/apps/${context.applicationId}/${endpoint}`
        }, userOpts);
    }

    /**
     * Delete a object by ID
     * @param {string} id ID of the object to delete
     * @param {Object} userOpts option overrides for this request
     * @returns {Promise<Object>} A promise that resolves to the deleted object
     */
    function remove(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${context.applicationId}/${endpoint}/${id}`
        }, userOpts);
    }

    return {
        get: get,
        getIterator,
        getAll,
        create,
        update,
        remove
    };
};
