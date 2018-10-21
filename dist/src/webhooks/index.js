"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const ENDPT = 'webhooks';
/**
 * Webhooks resource
 */
class WebhooksResource {
    /**
     * Construct the Webhooks resource
     * @param context The context to make requests as
     */
    constructor(context) {
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
     * Retrieve all Webhooks, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of Webhooks
     */
    getAll(userOpts) {
        return this.common.getAll(userOpts);
    }
    /**
     * Updates a webhook by ID
     * @param id ID of the webhook to update
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated webhook
     */
    update(id, updates, userOpts) {
        return this.common.update(id, updates, userOpts);
    }
    /**
     * Create a webhook
     * @param webhook webhook to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the webhook
     */
    create(webhook, userOpts) {
        return this.common.create(webhook, userOpts);
    }
    /**
     * Delete a webhook by ID
     * @param id ID of the webhook to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted webhook
     */
    remove(id, userOpts) {
        return this.common.remove(id, userOpts);
    }
}
exports.WebhooksResource = WebhooksResource;
//# sourceMappingURL=index.js.map