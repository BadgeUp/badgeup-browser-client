'use strict';

import * as check from 'check-types';
import * as qs from 'qs';
import { JsonPatch } from './utils/JsonPatch.class';
import { pageToGenerator } from './utils/pageToGenerator';
import { ResourceContext } from './utils/ResourceContext';

/**
 * Provides a set of common functionality that can be used on most endpoints
 * @param {ResourceContext} context The context to make requests as
 * @param endpoint The endpoint used for this common module
 */
export class Common<T> {
    protected context: ResourceContext;
    private endpoint: string;

    constructor(context: ResourceContext, endpoint: string) {
        this.context = context;
        this.endpoint = endpoint;
    }

    /**
     * Retrieve resource object by ID
     * @param id ID of the object to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    get(id: string, userOpts?): Promise<T> {
        check.assert.string(id, 'id must be a string');

        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });

        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}/${id}${query}`
        }, userOpts);
    }

    /**
     * Retrieve all objects, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getIterator(userOpts?): IterableIterator<Promise<T | undefined>> {
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        let url = `/v2/apps/${this.context.applicationId}/${this.endpoint}${query}`;
        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                url = body.pages.next;
                return body;
            });
        };

        yield* pageToGenerator(pageFn);
    }

    /**
     * Retrieve all objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of objects
     */
    getAll(userOpts?): Promise<T[]> {
        let array = [];
        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });
        let url = `/v2/apps/${this.context.applicationId}/${this.endpoint}${query}`;

        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                array = array.concat(body.data || []); // concatinate the new data

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
     * Updates a resource by ID
     * @param id ID of the object to be updated
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated object
     */
    update(id: string, updates: JsonPatch[], userOpts?): Promise<T> {
        check.assert.string(id, 'id must be a string');
        check.assert.array(updates, 'updates must be an array');

        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });

        return this.context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}/${id}${query}`
        }, userOpts);
    }

    /**
     * Create an object
     * @param object Sub-resource to object to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided object
     */
    create<K = T>(object: object, userOpts?): Promise<K> {
        check.assert.object(object, 'object must be an object');

        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });

        return this.context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}${query}`
        }, userOpts);
    }

    /**
     * Delete an object by ID
     * @param id ID of the object to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted object
     */
    remove(id: string, userOpts?): Promise<T> {
        check.assert.string(id, 'id must be a string');

        const query = qs.stringify((userOpts || {}).query, { addQueryPrefix: true });

        return this.context.http.makeRequest({
            method: 'DELETE',
            url: `/v2/apps/${this.context.applicationId}/${this.endpoint}/${id}${query}`
        }, userOpts);
    }
}
