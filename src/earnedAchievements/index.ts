import * as check from 'check-types';
import { URLSearchParams } from 'url';
import { Common } from '../common';
import { pageToGenerator, PaginatedData } from '../utils/pageToGenerator';
import { ResourceContext } from '../utils/ResourceContext';
import { EarnedAchievement } from './EarnedAchievement.class';

const ENDPT = 'earnedachievements';

export class EarnedAchievementQueryBuilder {

    context: ResourceContext;

    // container for the query parameters
    private params: URLSearchParams = new URLSearchParams();

    constructor(context: ResourceContext) {
        this.context = context;
    }

    /**
     * Query by achievement ID
     * @param achievementId
     */
    achievementId(achievementId: string): EarnedAchievementQueryBuilder {
        check.assert.string(achievementId, 'achievementId must be a string');
        this.params.set('achievementId', achievementId);
        return this;
    }

    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string): EarnedAchievementQueryBuilder {
        check.assert.string(subject, 'subject must be a string');
        this.params.set('subject', subject);
        return this;
    }

    /**
     * Query by starting date (find after)
     * @param {Date} since
     */
    since(since: Date): EarnedAchievementQueryBuilder {
        check.assert.date(since, 'since must be a date');
        this.params.set('since', since.toISOString());
        return this;
    }

    /**
     * Query by ending date (find before)
     * @param {Date} until
     */
    until(until: Date): EarnedAchievementQueryBuilder {
        check.assert.date(until, 'until must be a date');
        this.params.set('until', until.toISOString());
        return this;
    }

    /**
     * Checks and builds query parameters for use in a URL
     * @returns Returns a string containing URL query parameters
     */
    private buildQuery(): string {
        if ([...this.params.keys()].length === 0) {
            throw new Error('You must specify at least the "achievementId", "subject", "since", or "until"');
        }

        return this.params.toString();
    }

    /**
     * Retrieves queried earned achievements, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a list of metrics
     */
    getAll(userOpts?): Promise<EarnedAchievement[]> {
        let array = [];
        const queryPart = this.buildQuery();

        const context = this.context;
        let url = `/v2/apps/${context.applicationId}/${ENDPT}?${queryPart}`;

        function pageFn(): Promise<EarnedAchievement[]> {
            return context.http.makeRequest({ url }, userOpts).then(function(body) {
                array = array.concat(body.data || []); // concatenate the new data

                url = body.pages.next;
                if (url) {
                    return pageFn();
                } else {
                    return array;
                }
            });
        }

        return pageFn();
    }

    /**
     * Retrieves queried earned achievements, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts?): IterableIterator<Promise<EarnedAchievement | undefined>> {
        const queryPart = this.buildQuery();

        const context = this.context;
        function pageFn(): () => Promise<PaginatedData<EarnedAchievement>> {
            let url = `/v2/apps/${context.applicationId}/${ENDPT}?${queryPart}`;
            return function(): Promise<PaginatedData<EarnedAchievement>> {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }

        yield* pageToGenerator<EarnedAchievement>(pageFn());
    }

    /**
     * Delete all queried earned achievements
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an object stating the number of deleted earned achievements
     */
    remove(userOpts?) {
        const queryPart = this.buildQuery();

        return this.context.http.makeRequest({
            method: 'DELETE',
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}?${queryPart}`
        }, userOpts);
    }
}

/**
 * Earned Achievements resource
 */
export class EarnedAchievementsResource {

    private common: Common<EarnedAchievement>;
    private context: ResourceContext;

    /**
     * Construct the earned achievements resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.context = context;
        this.common = new Common(context, ENDPT);
    }

    /**
     * Retrieve an achievement by ID
     * @param id ID of the achievement to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    public get(id: string, userOpts?): Promise<EarnedAchievement> {
        return this.common.get(id, userOpts);
    }

    /**
     * Retrieve all earned achievements, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    public getIterator(userOpts?): IterableIterator<Promise<EarnedAchievement | undefined>> {
        return this.common.getIterator(userOpts);
    }

    /**
     * Retrieve all earned achievements, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of earned achievements
     */
    public getAll(userOpts?): Promise<EarnedAchievement[]> {
        return this.common.getAll(userOpts);
    }

    /**
     * Delete an earned achievement by ID
     * @param id ID of the achievement to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted achievement
     */
    public remove(id: string, userOpts?): Promise<EarnedAchievement> {
        return this.common.remove(id, userOpts);
    }

    /**
     * Sets up a request targeting earned achievements using query filters
     * @returns Returns an instance of the EarnedAchievementQueryBuilder class
     */
    public query(): EarnedAchievementQueryBuilder {
        return new EarnedAchievementQueryBuilder(this.context);
    }
}
