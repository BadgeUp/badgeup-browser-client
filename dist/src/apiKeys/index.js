"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const ENDPT = 'apikeys';
/**
 * API Keys resource
 */
class ApiKeysResource {
    /**
     * Construct the API Keys resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.context = context;
        this.common = new common_1.Common(context, ENDPT);
    }
    /**
     * Retrieve all objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts) {
        return this.common.getIterator(userOpts);
    }
    /**
     * Retrieve all API Keys, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of API Keys
     */
    getAll(userOpts) {
        return this.common.getAll(userOpts);
    }
    /**
     * Updates an API Key by ID
     * @param id ID of the API Key to update
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated API Key
     */
    update(id, updates, userOpts) {
        return this.common.update(id, updates, userOpts);
    }
    /**
     * Create an API Key
     * @param apiKey API Key to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the API Key
     */
    create(apiKey, userOpts) {
        return this.common.create(apiKey, userOpts);
    }
    /**
     * Delete an API Key by ID
     * @param id ID of the API Key to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted API Key
     */
    remove(id, userOpts) {
        return this.common.remove(id, userOpts);
    }
    /**
     * Get all possible API key scopes
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the requested API key scopes
     */
    listScopes(userOpts) {
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}/scopes`
        }, userOpts).then((body) => body.data);
    }
}
exports.ApiKeysResource = ApiKeysResource;
//# sourceMappingURL=index.js.map