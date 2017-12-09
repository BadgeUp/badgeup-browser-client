'use strict';

const check = require('check-types');
const pageToGenerator = require('./../utils/pageToGenerator');
const ENDPT = 'apps';

/**
 * API Keys module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function applications(context) {
    /**
     * Create an application
     * @param {object} event object
     * @param userOpts: option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    function create(object, userOpts) {
        check.object(object, 'object must be an object');

        return context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v1/${ENDPT}`
        }, userOpts);
    }

    /**
     * Update an application
     * @param id: ID of the application to be updated
     * @param updates: JSON patch updates
     * @param userOpts: option overrides for this request
     * @returns Returns a promise that resolves to the updated application
     */
    function update(id, updates, userOpts) {
        check.string(id, 'id must be a string');
        check.array(updates, 'updates must be an array');

        return context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }

    /**
     * Delete an application
     * @param id: ID of the application to be updated
     * @param userOpts: option overrides for this request
     * @returns Returns a promise
     */
    function remove(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }

    /**
     * Retrieve application by ID
     * @param id ID of the application to retrieve
     * @param userOpts: option overrides for this request
     * @returns Returns a promise that resolves with the retrieved application
     */
    function get(id, userOpts) {
        check.string(id, 'id must be a string');

        return context.http.makeRequest({
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }

    /**
     * Retrieve all objects, returned as an array
     * @param userOpts: option overrides for this request
     * @return A promise that resolves to an array of objects
     */
    function getAll(userOpts) {
        let array = [];
        let url = `/v1/${ENDPT}`;

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
     * Retrieve all applications
     * @param userOpts: option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    function* getIterator(userOpts) {
        function pageFn() {
            let url = `/v1/${ENDPT}`;
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
        get: get,
        getAll,
        getIterator,
        create,
        update,
        remove
    };
};
