"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check = require("check-types");
const pageToGenerator_1 = require("./../utils/pageToGenerator");
const ENDPT = 'apps';
/**
 * Applications resource
 */
class ApplicationsResource {
    /**
     * Construct the Applications resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * Create an application
     * @param object application object
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided application
     */
    create(object, userOpts) {
        check.assert.object(object, 'object must be an object');
        return this.context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v1/${ENDPT}`
        }, userOpts);
    }
    /**
     * Update an application
     * @param id ID of the application to be updated
     * @param {object[]} updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to the updated application
     */
    update(id, updates, userOpts) {
        check.assert.string(id, 'id must be a string');
        check.assert.array(updates, 'updates must be an array');
        return this.context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }
    /**
     * Delete an application
     * @param id ID of the application to be updated
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted application
     */
    remove(id, userOpts) {
        check.assert.string(id, 'id must be a string');
        return this.context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }
    /**
     * Retrieve application by ID
     * @param id ID of the application to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved application
     */
    get(id, userOpts) {
        check.assert.string(id, 'id must be a string');
        return this.context.http.makeRequest({
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }
    /**
     * Retrieve all objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of objects
     */
    getAll(userOpts) {
        let array = [];
        let url = `/v1/${ENDPT}`;
        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function (body) {
                array = array.concat(body.data || []); // concatenate the new data
                url = body.pages.next;
                if (url) {
                    return pageFn();
                }
                else {
                    return array;
                }
            });
        };
        return pageFn();
    }
    /**
     * Retrieve all applications
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts) {
        const pageFn = () => {
            let url = `/v1/${ENDPT}`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function (body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };
        yield* pageToGenerator_1.pageToGenerator(pageFn());
    }
}
exports.ApplicationsResource = ApplicationsResource;
//# sourceMappingURL=index.js.map