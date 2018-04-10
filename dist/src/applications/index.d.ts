import { ResourceContext } from '../utils/ResourceContext';
import { BadgeUpApplication, BadgeUpApplicationRequest } from './Application.class';
import { JsonPatch } from '../utils/JsonPatch.class';
/**
 * Applications resource
 */
export declare class ApplicationsResource {
    private context;
    /**
     * Construct the Applications resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Create an application
     * @param object application object
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided application
     */
    create(object: BadgeUpApplicationRequest, userOpts?: any): Promise<BadgeUpApplication>;
    /**
     * Update an application
     * @param id ID of the application to be updated
     * @param {object[]} updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to the updated application
     */
    update(id: string, updates: JsonPatch[], userOpts?: any): Promise<BadgeUpApplication>;
    /**
     * Delete an application
     * @param id ID of the application to be updated
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted application
     */
    remove(id: string, userOpts?: any): Promise<BadgeUpApplication>;
    /**
     * Retrieve application by ID
     * @param id ID of the application to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved application
     */
    get(id: string, userOpts?: any): Promise<BadgeUpApplication>;
    /**
     * Retrieve all objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of objects
     */
    getAll(userOpts?: any): Promise<BadgeUpApplication[]>;
    /**
     * Retrieve all applications
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getIterator(userOpts?: any): IterableIterator<Promise<BadgeUpApplication | undefined>>;
}
