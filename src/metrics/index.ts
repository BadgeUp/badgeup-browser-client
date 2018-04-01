import * as check from 'check-types';
import * as querystring from 'querystring';
import { Common } from '../common';
import { collectQueryParams } from '../utils/collectQueryParams';
import { pageToGenerator } from '../utils/pageToGenerator';
import { QueryParameters } from '../utils/QueryBuilder';
import { ResourceContext } from '../utils/ResourceContext';
import { Metric, MetricRequest } from './Metric.class';

const ENDPT = 'metrics';

const DELETE_QUERY_PARAMS = ['key', 'subject'];

export class MetricQueryBuilder {
    context: ResourceContext;

    // container for the query parameters
    private _params: QueryParameters = {};

    /**
     * Construct the metrics resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.context = context;
    }

    /**
     * Query by key
     * @param key
     */
    key(key: string) {
        check.assert.string(key, 'key must be a string');
        this._params.key = key;
        return this;
    }

    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string) {
        check.assert.string(subject, 'subject must be a string');
        this._params.subject = subject;
        return this;
    }

    /**
     * Deletes all queried metrics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an object stating the number of deleted metrics
     */
    remove(userOpts?: Object) {
        const queryBy = collectQueryParams(this._params, DELETE_QUERY_PARAMS);

        if (Object.keys(queryBy).length === 0) {
            throw new Error('You must specify at least the "subject" or "key"');
        }

        return this.context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/apps/${this.context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`
        }, userOpts);
    }
}

/**
 * Metrics module
 * @param {ResourceContext} context The context to make requests as
 */
export class MetricsResource {
    private common: Common<Metric>;
    private context: ResourceContext;


    constructor(context: ResourceContext) {
        this.common = new Common(context, ENDPT);
        this.context = context;
    }

    /**
     * Retrieve all metrics, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of metrics
     */
    public getAll(userOpts?): Promise<Metric[]> {
        return this.common.getAll(userOpts);
    }

    /**
     * Retrieve all metrics, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next metric
     */
    getIterator(userOpts?): IterableIterator<Promise<Metric | undefined>> {
        return this.common.getIterator(userOpts);
    }

    /**
     * Create a metric
     * @param metric Sub-resource to metric to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided metric
     */
    public create(object: MetricRequest, userOpts?): Promise<Metric | undefined> {
        return this.common.create(object, userOpts);
    }

    /**
     * Retrieves metrics for a subject, returned as an array
     * @param subject subject to retrieve the metrics for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a list of metrics
     */
    public getAllSubjectMetrics(subject: string, userOpts?: Object): Promise<Metric[]> {
        check.assert.string(subject, 'subject must be a string');

        let array = [];
        let url = `/v1/apps/${this.context.applicationId}/${ENDPT}/${subject}`;

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
     * Retrieves metrics for a subject, returned as an iterator
     * @param subject subject to retrieve the metrics for
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    public *getSubjectMetricsIterator(subject: string, userOpts?: Object): IterableIterator<Promise<Metric | undefined>> {
        check.assert.string(subject, 'subject must be a string');

        const pageFn = () => {
            let url = `/v1/apps/${this.context.applicationId}/${ENDPT}/${subject}`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };

        yield* pageToGenerator<Metric | undefined>(pageFn());
    }

    /**
     * Retrieves a single metric for a subject by key
     * @param subject subject to retrieve the metric for
     * @param key metric key to retrieve the metric for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a single metric
     */
    public getIndividualSubjectMetric(subject: string, key: string, userOpts?: Object): Promise<Metric> {
        check.assert.string(subject, 'subject must be a string');
        check.assert.string(key, 'key must be a string');

        return this.context.http.makeRequest({
            url: `/v1/apps/${this.context.applicationId}/${ENDPT}/${subject}/${key}`
        }, userOpts);
    }

    /**
     * Sets up a delete/get request targeting metrics using query filters
     * @returns Returns an instance of the EventQueryBuilder class
     */
    public query(): MetricQueryBuilder {
        return new MetricQueryBuilder(this.context);
    }

}
