import * as check from 'check-types';
import { Award } from '../awards/Award.class';
import { Common } from '../common';
import { Criterion } from '../criteria/Criterion.class';
import { JsonPatch } from '../utils/JsonPatch.class';
import { ResourceContext } from '../utils/ResourceContext';
import { Achievement, AchievementRequest } from './Achievement.class';

const ENDPT = 'achievements';

/**
 * Achievements resource
 */
export class AchievementsResource {
    private common: Common<Achievement>;
    private context: ResourceContext;

    /**
     * Construct the achievements resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.context = context;
        this.common = new Common<Achievement>(context, ENDPT);
    }

    /**
     * Retrieve an achievement by ID
     * @param id ID of the achievement to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    public get(id: string, userOpts?): Promise<Achievement> {
        return this.common.get(id, userOpts);
    }

    /**
     * Retrieve all achievements, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    public getIterator(userOpts?): IterableIterator<Promise<Achievement>> {
        return this.common.getIterator(userOpts);
    }

    /**
     * Retrieve all achievements, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of objects
     */
    public getAll(userOpts?): Promise<Achievement[]> {
        return this.common.getAll(userOpts);
    }

    /**
     * Updates an achievement by ID
     * @param id ID of the achievement to be updated
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated object
     */
    public update(id: string, updates: JsonPatch[], userOpts?): Promise<Achievement> {
        return this.common.update(id, updates, userOpts);
    }

    /**
     * Create an achievement
     * @param achievement Sub-resource to achievement to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided achievement
     */
    public create(achievement: AchievementRequest, userOpts?): Promise<Achievement> {
        return this.common.create(achievement, userOpts);
    }

    /**
     * Delete an achievement by ID
     * @param id ID of the achievement to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted achievement
     */
    public remove(id: string, userOpts?): Promise<Achievement> {
        return this.common.remove(id, userOpts);
    }

    /**
     * Retrieves the list of criteria associated with an achievement
     * @param id ID of the achievement to retrieve criteria for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the list of criteria
     */
    public getAchievementCriteria(id: string, userOpts?): Promise<Criterion[]> {
        check.assert.string(id, 'id must be a string');

        return this.context.http.makeRequest({
            url: `/v1/apps/${this.context.applicationId}/${ENDPT}/${id}/criteria`
        }, userOpts).then(function (body) { return body.data as Criterion[]; });
    }

    /**
     * Retrieves the list of awards associated with an achievement
     * @param id ID of the achievement to retrieve criteria for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the list of awards
     */
    public getAchievementAwards(id: string, userOpts?): Promise<Award[]> {
        check.assert.string(id, 'id must be a string');

        return this.context.http.makeRequest({
            url: `/v1/apps/${this.context.applicationId}/${ENDPT}/${id}/awards`
        }, userOpts).then((body) => {
            return body.data;
        });
    }
}
