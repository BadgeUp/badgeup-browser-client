import { ResourceContext } from '../utils/ResourceContext';
import { Metric, MetricRequest } from './Metric.class';
export declare class MetricQueryBuilder {
    context: ResourceContext;
    private _params;
    /**
     * Construct the metrics resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Query by key
     * @param key
     */
    key(key: string): this;
    /**
     * Query by subject
     * @param subject
     */
    subject(subject: string): this;
    /**
     * Deletes all queried metrics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an object stating the number of deleted metrics
     */
    remove(userOpts?: any): Promise<any>;
}
/**
 * Metrics module
 * @param {ResourceContext} context The context to make requests as
 */
export declare class MetricsResource {
    private common;
    private context;
    constructor(context: ResourceContext);
    getAll(userOpts?: any): Promise<Metric[]>;
    getIterator(userOpts?: any): IterableIterator<Promise<Metric>>;
    create(object: MetricRequest, userOpts?: any): Promise<Metric>;
    /**
     * Retrieves metrics for a subject, returned as an array
     * @param subject subject to retrieve the metrics for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a list of metrics
     */
    getAllSubjectMetrics(subject: string, userOpts?: any): Promise<Metric[]>;
    /**
     * Retrieves metrics for a subject, returned as an iterator
     * @param subject subject to retrieve the metrics for
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    getSubjectMetricsIterator(subject: string, userOpts?: any): IterableIterator<Promise<Metric>>;
    /**
     * Retrieves a single metric for a subject by key
     * @param subject subject to retrieve the metric for
     * @param key metric key to retrieve the metric for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to a single metric
     */
    getIndividualSubjectMetric(subject: string, key: string, userOpts?: any): Promise<Metric>;
    /**
     * Sets up a delete/get request targeting metrics using query filters
     * @returns Returns an instance of the EventQueryBuilder class
     */
    query(): MetricQueryBuilder;
}
