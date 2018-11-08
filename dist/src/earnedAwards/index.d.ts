import { ResourceContext } from '../utils/ResourceContext';
import { EarnedAward } from './EarnedAward.class';
export declare class EarnedAwardQueryBuilder {
    context: ResourceContext;
    private params;
    constructor(context: ResourceContext);
    /**
     * Query by award ID
     * @param awardId
     */
    awardId(awardId: string): EarnedAwardQueryBuilder;
    /**
     * Query by earned achievement ID
     * @param earnedAchievementId
     */
    earnedAchievementId(earnedAchievementId: string): EarnedAwardQueryBuilder;
    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string): EarnedAwardQueryBuilder;
    /**
     * Query by starting date (find after)
     * @param {Date} since
     */
    since(since: Date): EarnedAwardQueryBuilder;
    /**
     * Query by ending date (find before)
     * @param {Date} until
     */
    until(until: Date): EarnedAwardQueryBuilder;
    /**
     * Checks and builds query parameters for use in a URL
     * @returns Returns a string containing URL query parameters
     */
    private buildQuery;
    /**
     * Retrieves queried earned awards, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a list of metrics
     */
    getAll(userOpts?: any): Promise<EarnedAward[]>;
    /**
     * Retrieves queried earned awards, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getIterator(userOpts?: any): IterableIterator<Promise<EarnedAward | undefined>>;
}
/**
 * Earned Awards resource
 */
export declare class EarnedAwardsResource {
    private common;
    private context;
    /**
     * Construct the earned award resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Retrieve an earned award by ID
     * @param id ID of the earned award to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    get(id: string, userOpts?: any): Promise<EarnedAward>;
    /**
     * Retrieve all earned awards, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    getIterator(userOpts?: any): IterableIterator<Promise<EarnedAward | undefined>>;
    /**
     * Retrieve all earned awards, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of earned awards
     */
    getAll(userOpts?: any): Promise<EarnedAward[]>;
    /**
     * Sets up a request targeting earned awards using query filters
     * @returns Returns an instance of the EarnedAwardQueryBuilder class
     */
    query(): EarnedAwardQueryBuilder;
}
