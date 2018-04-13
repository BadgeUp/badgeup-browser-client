import { JsonPatch } from '../utils/JsonPatch.class';
import { ResourceContext } from '../utils/ResourceContext';
import { ApiKey, ApiKeyScope } from './ApiKey.class';
/**
 * API Keys resource
 */
export declare class ApiKeysResource {
    private common;
    private context;
    /**
     * Construct the API Keys resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Retrieve all objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getIterator(userOpts?: any): IterableIterator<Promise<ApiKey>>;
    /**
     * Retrieve all API Keys, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of API Keys
     */
    getAll(userOpts?: any): Promise<ApiKey[]>;
    /**
     * Updates an API Key by ID
     * @param id ID of the API Key to update
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated API Key
     */
    update(id: string, updates: JsonPatch[], userOpts?: any): Promise<ApiKey>;
    /**
     * Create an API Key
     * @param apiKey API Key to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the API Key
     */
    create(apiKey: ApiKey, userOpts?: any): Promise<ApiKey>;
    /**
     * Delete an API Key by ID
     * @param id ID of the API Key to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted API Key
     */
    remove(id: string, userOpts?: any): Promise<ApiKey>;
    /**
     * Get all possible API key scopes
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the requested API key scopes
     */
    listScopes(userOpts?: any): Promise<ApiKeyScope[]>;
}
