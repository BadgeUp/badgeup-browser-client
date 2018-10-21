import { JsonPatch } from '../utils/JsonPatch.class';
import { ResourceContext } from '../utils/ResourceContext';
import { Webhook } from './Webhook.class';
/**
 * Webhooks resource
 */
export declare class WebhooksResource {
    private common;
    /**
     * Construct the Webhooks resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Retrieve all objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getIterator(userOpts?: any): IterableIterator<Promise<Webhook>>;
    /**
     * Retrieve all Webhooks, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of Webhooks
     */
    getAll(userOpts?: any): Promise<Webhook[]>;
    /**
     * Updates a webhook by ID
     * @param id ID of the webhook to update
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated webhook
     */
    update(id: string, updates: JsonPatch[], userOpts?: any): Promise<Webhook>;
    /**
     * Create a webhook
     * @param webhook webhook to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the webhook
     */
    create(webhook: Webhook, userOpts?: any): Promise<Webhook>;
    /**
     * Delete a webhook by ID
     * @param id ID of the webhook to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted webhook
     */
    remove(id: string, userOpts?: any): Promise<Webhook>;
}
