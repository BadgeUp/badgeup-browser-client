import * as check from 'check-types';
import { URLSearchParams } from 'url';
import { ResourceContext } from '../utils/ResourceContext';
import { pageToGenerator } from './../utils/pageToGenerator';
import { Progress } from './Progress.class';

const ENDPT = 'progress';

export class ProgressQueryBuilder {

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
    achievementId(achievementId: string): ProgressQueryBuilder {
        check.assert.string(achievementId, 'achievementId must be a string');
        this.params.set('achievementId', achievementId);
        return this;
    }

    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string): ProgressQueryBuilder {
        check.assert.string(subject, 'subject must be a string');
        this.params.set('subject', subject);
        return this;
    }

    /**
     * Include additional resources in the response
     * @param resource
     */
    include(resource: 'achievement' | 'criterion' | 'award'): ProgressQueryBuilder {
        // remove any existing includes
        this.params.append('include', resource);
        return this;
    }

    /**
     * Retrieve all queried progress objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of progress objects
     */
    getAll(userOpts?): Promise<Progress[]> {
        if (!this.params.has('subject')) {
            throw new Error('subject must be provided');
        }

        let array = [];
        let url = `/v2/apps/${this.context.applicationId}/${ENDPT}?${this.params.toString()}`;

        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                array = array.concat(body.data || []); // concatenate the new data

                url = body.pages.next;
                if (url) {
                    return pageFn();
                } else {
                    return array;
                }
            });
        };

        return pageFn();
    }

    /**
     * Retrieve all queried progress objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next progress object
     */
    *getIterator(userOpts?): IterableIterator<Promise<Progress | undefined>> {
        if (!this.params.has('subject')) {
            throw new Error('subject must be provided');
        }

        const pageFn = () => {
            let url = `/v2/apps/${this.context.applicationId}/${ENDPT}?${this.params.toString()}`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };

        yield* pageToGenerator<Progress| undefined>(pageFn());
    }
}

/**
 * Progress resource
 */
export class ProgressResource {
    context: ResourceContext;

    /**
     * Construct the Progress resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.context = context;
    }

    /**
     * @returns Returns an instance of the ProgressQueryBuilder class
     */
    query(): ProgressQueryBuilder {
        return new ProgressQueryBuilder(this.context);
    }
}
