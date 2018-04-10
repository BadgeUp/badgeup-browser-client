import * as check from 'check-types';
import { ResourceContext } from '../utils/ResourceContext';
import { pageToGenerator } from './../utils/pageToGenerator';
import { BadgeUpApplication, BadgeUpApplicationRequest } from './Application.class';
import { JsonPatch } from '../utils/JsonPatch.class';

const ENDPT = 'apps';

/**
 * Applications resource
 */
export class ApplicationsResource {
    private context: ResourceContext;

    /**
     * Construct the Applications resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.context = context;
    }

    /**
     * Create an application
     * @param object application object
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided application
     */
    public create(object: BadgeUpApplicationRequest, userOpts?): Promise<BadgeUpApplication> {
        check.assert.object(object, 'object must be an object');

        return this.context.http.makeRequest({
            method: 'POST',
            body: object,
            url: `/v1/${ENDPT}`
        }, userOpts);
    }

    /**
     * Update an application
     * @param id ID of the application to be updated
     * @param {object[]} updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to the updated application
     */
    public update(id: string, updates: JsonPatch[], userOpts?): Promise<BadgeUpApplication> {
        check.assert.string(id, 'id must be a string');
        check.assert.array(updates, 'updates must be an array');

        return this.context.http.makeRequest({
            method: 'PATCH',
            body: updates,
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }

    /**
     * Delete an application
     * @param id ID of the application to be updated
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted application
     */
    public remove(id: string, userOpts?): Promise<BadgeUpApplication> {
        check.assert.string(id, 'id must be a string');

        return this.context.http.makeRequest({
            method: 'DELETE',
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }

    /**
     * Retrieve application by ID
     * @param id ID of the application to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved application
     */
    public get(id: string, userOpts?): Promise<BadgeUpApplication> {
        check.assert.string(id, 'id must be a string');

        return this.context.http.makeRequest({
            url: `/v1/${ENDPT}/${id}`
        }, userOpts);
    }

    /**
     * Retrieve all objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of objects
     */
    public getAll(userOpts?): Promise<BadgeUpApplication[]> {
        let array = [];
        let url = `/v1/${ENDPT}`;

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
     * Retrieve all applications
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    public *getIterator(userOpts?): IterableIterator<Promise<BadgeUpApplication | undefined>> {
        const pageFn = () => {
            let url = `/v1/${ENDPT}`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function(body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };

        yield* pageToGenerator(pageFn());
    }
}
