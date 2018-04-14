import { defaultsDeep } from 'lodash';
import fetch, { Response } from 'node-fetch';
import * as pRetry from 'p-retry';
import { replacer } from './utils/dateStringify';

// number of retries to be attmpted in case of http errors
const RETRY_COUNT = 3;

// client library defaults
const requestDefaults = {
    timeout: 15000,
    compress: true, // allow gzip
    follow: 2, // max 2 redirects
    baseUrl: 'https://api.useast1.badgeup.io', // default API endpoint
    headers: {
        'User-Agent': 'badgeup-js-client/1.0.0 (https://badgeup.io/)',
        'Accept': 'application/json'
    }
};

export class BadgeUpHttp {

    globalReqOpts;

    /**
     * Constructor for the HTTP stack for BadgeUp
     * @param globalReqOpts Options from the user for BadgeUp as a whole.
     */
    constructor(globalReqOpts) {
        this.globalReqOpts = globalReqOpts || {};
    }

    /**
     * Performs a HTTP request given the collective options
     * @param reqOpts Request options from this library's functions.
     * @param userOpts Option overrides from the user. Highest priority.
     * @return Returns a Promise that resolves with the request data
     */
    makeRequest(reqOpts, userOpts): Promise<any> {
        const options = defaultsDeep({}, userOpts, reqOpts, this.globalReqOpts, requestDefaults);

        // for internal unit tests
        if (options._validate) {
            options._validate(options);
        }

        // for internal unit tests
        if (options._payload) {
            return Promise.resolve(options._payload(options));
        }

        if (!options.baseUrl && !options.url) {
            throw new TypeError('options.baseUrl or options.url must be provided and must be a string');
        }

        if (options.body && (typeof options.body === 'object' || Array.isArray(options.body))) {

            // set headers
            options.headers = options.headers || {};
            options.headers['Content-Type'] = 'application/json';

            // stringify dates to include timezones
            options.body = JSON.stringify(options.body, replacer);
        }

        // build the URL
        let url = options.url || '';
        url = options.baseUrl ? options.baseUrl + url : url;
        delete options.baseUrl;
        delete options.url;

        return fetchWithRetry(url, options)
            .then(response => {
                if (!response.ok) {
                    const err = new Error(response.statusText);
                    return Promise.reject(err);
                }
                return response.json().then(hydrateDates);
            });
    }
}

/**
 * Performs fetch with retries in case of HTTP errors
 * @param url request url
 * @param options request options
 * @returns Returns a Promise that resolves with the response object
 */
function fetchWithRetry(url: string, options) {
    function fetchWrapper(): Promise<Response> {
        return fetch(url, options).then((response: Response) => {
            // don't retry if status is 4xx
            if (response.status >= 400 && response.status < 500) {
                throw new pRetry.AbortError(response.statusText);
            }

            return response;
        });
    }

    return pRetry(fetchWrapper, { retries: RETRY_COUNT });
}

/**
 * Hydrates dates in response bodies. Handles paginated responses and object responses.
 * Mutates input.
 * @param body HTTP response body
 */
function hydrateDates(body: any): any {

    /**
     * Hydrates a string date to a Date object. Mutates input.
     * @param item object potentially containing a meta object
     */
    function hydrateMeta(item: any) {
        const meta = item.meta;
        if (meta && meta.created) {
            // parse ISO-8601 string to Date
            meta.created = new Date(meta.created);
        }
    }

    if (Array.isArray(body.data)) {
        // paginated response
        for (const item of body.data) {
            hydrateMeta(item);
        }
    } else {
        // object response
        hydrateMeta(body);
    }

    return body;
}
