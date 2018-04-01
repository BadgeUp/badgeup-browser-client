import { ResourceContext } from '../utils/ResourceContext';
import { EarnedAchievement } from './EarnedAchievement.class';
export declare class EarnedAchievementQueryBuilder {
    context: ResourceContext;
    private params;
    constructor(context: ResourceContext);
    /**
     * Query by achievement ID
     * @param achievementId
     */
    achievementId(achievementId: string): EarnedAchievementQueryBuilder;
    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string): EarnedAchievementQueryBuilder;
    /**
     * Query by starting date (find after)
     * @param {Date} since
     */
    since(since: Date): EarnedAchievementQueryBuilder;
    /**
     * Query by ending date (find before)
     * @param {Date} until
     */
    until(until: Date): EarnedAchievementQueryBuilder;
    /**
     * Checks and builds query parameters for use in a URL
     * @returns Returns a string containing URL query parameters
     */
    private buildQuery(queryBy);
    /**
     * Retrieves queried earned achievements, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a list of metrics
     */
    getAll(userOpts: any): Promise<EarnedAchievement[]>;
    /**
     * Retrieves queried earned achievements, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getIterator(userOpts: any): IterableIterator<Promise<EarnedAchievement | undefined>>;
    /**
     * Delete all queried earned achievements
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an object stating the number of deleted earned achievements
     */
    remove(userOpts: any): Promise<any>;
}
/**
 * Earned Achievements resource
 */
export declare class EarnedAchievementsResource {
    private common;
    private context;
    /**
     * Construct the achievements resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Retrieve an achievement by ID
     * @param id ID of the achievement to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    get(id: string, userOpts?: any): Promise<EarnedAchievement>;
    /**
     * Retrieve all earned achievements, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    getIterator(userOpts?: any): IterableIterator<Promise<EarnedAchievement | undefined>>;
    /**
     * Retrieve all earned achievements, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of earned achievements
     */
    getAll(userOpts?: any): Promise<EarnedAchievement[]>;
    /**
     * Delete an earned achievement by ID
     * @param id ID of the achievement to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted achievement
     */
    remove(id: string, userOpts?: any): Promise<EarnedAchievement>;
    /**
     * Sets up a request targeting earned achievements using query filters
     * @returns Returns an instance of the EarnedAchievementQueryBuilder class
     */
    query(): EarnedAchievementQueryBuilder;
}
