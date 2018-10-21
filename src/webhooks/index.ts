import { Common } from '../common';
import { JsonPatch } from '../utils/JsonPatch.class';
import { ResourceContext } from '../utils/ResourceContext';
import { Webhook } from './Webhook.class';

const ENDPT = 'webhooks';

/**
 * Webhooks resource
 */
export class WebhooksResource {
    private common: Common<Webhook>;

    /**
     * Construct the Webhooks resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.common = new Common(context, ENDPT);
    }

    /**
     * Retrieve all objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts?): IterableIterator<Promise<Webhook>> {
        return this.common.getIterator(userOpts);
    }

    /**
     * Retrieve all Webhooks, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of Webhooks
     */
    getAll(userOpts?): Promise<Webhook[]> {
        return this.common.getAll(userOpts);
    }

    /**
     * Updates a webhook by ID
     * @param id ID of the webhook to update
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated webhook
     */
    update(id: string, updates: JsonPatch[], userOpts?): Promise<Webhook> {
        return this.common.update(id, updates, userOpts);
    }

    /**
     * Create a webhook
     * @param webhook webhook to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the webhook
     */
    create(webhook: Webhook, userOpts?): Promise<Webhook> {
        return this.common.create(webhook, userOpts);
    }

    /**
     * Delete a webhook by ID
     * @param id ID of the webhook to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted webhook
     */
    public remove(id: string, userOpts?): Promise<Webhook> {
        return this.common.remove(id, userOpts);
    }
}
