import * as check from 'check-types';
import { URLSearchParams } from 'url';
import { Common } from '../common';
import { pageToGenerator, PaginatedData } from '../utils/pageToGenerator';
import { ResourceContext } from '../utils/ResourceContext';
import { EarnedAward } from './EarnedAward.class';

const ENDPT = 'earnedawards';

const AVAILABLE_QUERY_PARAMS = ['subject', 'awardId', 'earnedAchievementId', 'since', 'until'];

export class EarnedAwardQueryBuilder {

    context: ResourceContext;

    // container for the query parameters
    private params: URLSearchParams = new URLSearchParams();

    constructor(context: ResourceContext) {
        this.context = context;
    }

    /**
     * Query by award ID
     * @param awardId
     */
    awardId(awardId: string): EarnedAwardQueryBuilder {
        check.assert.string(awardId, 'awardId must be a string');
        this.params.set('awardId', awardId);
        return this;
    }

    /**
     * Query by earned achievement ID
     * @param earnedAchievementId
     */
    earnedAchievementId(earnedAchievementId: string): EarnedAwardQueryBuilder {
        check.assert.string(earnedAchievementId, 'earnedAchievementId must be a string');
        this.params.set('earnedAchievementId', earnedAchievementId);
        return this;
    }

    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string): EarnedAwardQueryBuilder {
        check.assert.string(subject, 'subject must be a string');
        this.params.set('subject', subject);
        return this;
    }

    /**
     * Query by starting date (find after)
     * @param {Date} since
     */
    since(since: Date): EarnedAwardQueryBuilder {
        check.assert.date(since, 'since must be a date');
        this.params.set('since', since.toISOString());
        return this;
    }

    /**
     * Query by ending date (find before)
     * @param {Date} until
     */
    until(until: Date): EarnedAwardQueryBuilder {
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
            throw new Error('You must specify at least ' + AVAILABLE_QUERY_PARAMS.map(item => `"${item}"`).join(', '));
        }

        return this.params.toString();
    }

    /**
     * Retrieves queried earned awards, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a list of metrics
     */
    getAll(userOpts?): Promise<EarnedAward[]> {
        let array = [];
        const queryPart = this.buildQuery();

        const context = this.context;
        let url = `/v2/apps/${context.applicationId}/${ENDPT}?${queryPart}`;

        function pageFn(): Promise<EarnedAward[]> {
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
     * Retrieves queried earned awards, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts?): IterableIterator<Promise<EarnedAward | undefined>> {
        const queryPart = this.buildQuery();

        const context = this.context;
        function pageFn(): () => Promise<PaginatedData<EarnedAward>> {
            let url = `/v2/apps/${context.applicationId}/${ENDPT}?${queryPart}`;
            return function(): Promise<PaginatedData<EarnedAward>> {
                return context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        }

        yield* pageToGenerator<EarnedAward>(pageFn());
    }
}

/**
 * Earned Awards resource
 */
export class EarnedAwardsResource {

    private common: Common<EarnedAward>;
    private context: ResourceContext;

    /**
     * Construct the earned award resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.context = context;
        this.common = new Common(context, ENDPT);
    }

    /**
     * Retrieve an earned award by ID
     * @param id ID of the earned award to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    public get(id: string, userOpts?): Promise<EarnedAward> {
        return this.common.get(id, userOpts);
    }

    /**
     * Retrieve all earned awards, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    public getIterator(userOpts?): IterableIterator<Promise<EarnedAward | undefined>> {
        return this.common.getIterator(userOpts);
    }

    /**
     * Retrieve all earned awards, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of earned awards
     */
    public getAll(userOpts?): Promise<EarnedAward[]> {
        return this.common.getAll(userOpts);
    }

    /**
     * Sets up a request targeting earned awards using query filters
     * @returns Returns an instance of the EarnedAwardQueryBuilder class
     */
    public query(): EarnedAwardQueryBuilder {
        return new EarnedAwardQueryBuilder(this.context);
    }
}
