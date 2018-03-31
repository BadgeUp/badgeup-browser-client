import { JsonPatch } from './utils/JsonPatch.class';
import { ResourceContext } from './utils/ResourceContext';
/**
 * Provides a set of common functionality that can be used on most endpoints
 * @param {ResourceContext} context The context to make requests as
 * @param endpoint The endpoint used for this common module
 */
export declare class Common<T> {
    protected context: ResourceContext;
    private endpoint;
    constructor(context: ResourceContext, endpoint: string);
    /**
     * Retrieve resource object by ID
     * @param id ID of the object to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    get(id: string, userOpts?: any): Promise<T>;
    /**
     * Retrieve all objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getIterator(userOpts?: any): IterableIterator<Promise<T>>;
    /**
     * Retrieve all objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of objects
     */
    getAll(userOpts?: any): Promise<T[]>;
    /**
     * Updates a resource by ID
     * @param id ID of the object to be updated
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated object
     */
    update(id: string, updates: JsonPatch[], userOpts?: any): Promise<T>;
    /**
     * Create an object
     * @param object Sub-resource to object to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided object
     */
    create<K = T>(object: any, userOpts?: any): Promise<K>;
    /**
     * Delete an object by ID
     * @param id ID of the object to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted object
     */
    remove(id: string, userOpts?: any): Promise<T>;
}
