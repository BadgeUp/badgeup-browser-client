import { ResourceContext } from '../utils/ResourceContext';
import { Progress } from './Progress.class';
export declare class ProgressQueryBuilder {
    context: ResourceContext;
    private params;
    constructor(context: ResourceContext);
    /**
     * Query by achievement ID
     * @param achievementId
     */
    achievementId(achievementId: string): ProgressQueryBuilder;
    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string): ProgressQueryBuilder;
    /**
     * Retrieve all queried progress objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of progress objects
     */
    getAll(userOpts?: any): Promise<Progress[]>;
    /**
     * Retrieve all queried progress objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next progress object
     */
    getIterator(userOpts?: any): IterableIterator<Promise<Progress | undefined>>;
}
/**
 * Progress resource
 */
export declare class ProgressResource {
    context: ResourceContext;
    /**
     * Construct the Progress resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * @returns Returns an instance of the ProgressQueryBuilder class
     */
    query(): ProgressQueryBuilder;
}
