'use strict';
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const check = __importStar(require("check-types"));
const qs = __importStar(require("qs"));
const pageToGenerator_1 = require("./utils/pageToGenerator");
/**
 * Provides a set of common functionality that can be used on most endpoints
 * @param {ResourceContext} context The context to make requests as
 * @param endpoint The endpoint used for this common module
 */
class Common {
    constructor(context, endpoint) {
        this.context = context;
        this.endpoint = endpoint;
    }
    /**
     * Retrieve resource object by ID
     * @param id ID of the object to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    get(id, userOpts) {
        check.assert.string(id, 'id must be a string');
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}/${id}${query}`
        }, userOpts);
    }
    /**
     * Retrieve all objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts) {
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        let url = `/v2/apps/${this.context.applicationId}/${this.endpoint}${query}`;
        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function (body) {
                url = body.pages.next;
                return body;
            });
        };
        yield* pageToGenerator_1.pageToGenerator(pageFn);
    }
    /**
     * Retrieve all objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of objects
     */
    getAll(userOpts) {
        let array = [];
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        let url = `/v2/apps/${this.context.applicationId}/${this.endpoint}${query}`;
        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function (body) {
                array = array.concat(body.data || []); // concatinate the new data
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
     * Updates a resource by ID
     * @param id ID of the object to be updated
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated object
     */
    update(id, updates, userOpts) {
        check.assert.string(id, 'id must be a string');
        check.assert.array(updates, 'updates must be an array');
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        return this.context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}/${id}${query}`
        }, userOpts);
    }
    /**
     * Create an object
     * @param object Sub-resource to object to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided object
     */
    create(object, userOpts) {
        check.assert.object(object, 'object must be an object');
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        return this.context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}${query}`
        }, userOpts);
    }
    /**
     * Delete an object by ID
     * @param id ID of the object to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted object
     */
    remove(id, userOpts) {
        check.assert.string(id, 'id must be a string');
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        return this.context.http.makeRequest({
            method: 'DELETE',
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}/${id}${query}`
        }, userOpts);
    }
}
exports.Common = Common;
//# sourceMappingURL=common.js.map