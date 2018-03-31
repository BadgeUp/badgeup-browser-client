import { ResourceContext } from '../utils/ResourceContext';
/**
 * Analytics resource
 * USE OF THE ANALYTICS RESOURCE IS NOT RECOMMENDED (AT THIS TIME)
 * THIS RESOURCE IS NOT SUBJECT TO ANY SLAS AND MAY BE CHANGED AT ANY TIME
 */
export declare class AnalyticsResource {
    private context;
    /**
     * Construct the analytics resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Retrieve event analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    eventsLastNDays(numDays: number, userOpts?: any): Promise<any>;
    /**
     * Retrieve event analytics for a single subject
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    eventsLastNDaysBySubject(numDays: number, subject: any, userOpts?: any): Promise<any>;
    /**
     * Retrieve subject analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    subjectsLastNDays(numDays: number, userOpts?: any): Promise<any>;
    /**
     * Retrieve new subject analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    newSubjectsLastNDays(numDays: number, userOpts?: any): Promise<any>;
    /**
     * Retrieve earned achievement analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    earnedAchievementsLastNDays(numDays: number, userOpts?: any): Promise<any>;
    /**
     * Retrieve subject summary list
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getSubjectsSummaryIterator(userOpts?: any): IterableIterator<Promise<{}>>;
    /**
     * Retrieve a list of unique metric keys
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with an array of retrieved metric keys
     */
    getAllMetricKeys(userOpts?: any): Promise<any>;
}
