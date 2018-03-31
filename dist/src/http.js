"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const node_fetch_1 = require("node-fetch");
const dateStringify_1 = require("./utils/dateStringify");
// client library defaults
const requestDefaults = {
    timeout: 15000,
    compress: true,
    follow: 2,
    baseUrl: 'https://api.useast1.badgeup.io',
    headers: {
        'User-Agent': 'badgeup-js-client/1.0.0 (https://badgeup.io/)',
        'Accept': 'application/json'
    }
};
class BadgeUpHttp {
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
    makeRequest(reqOpts, userOpts) {
        const options = lodash_1.defaultsDeep({}, userOpts, reqOpts, this.globalReqOpts, requestDefaults);
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
            options.body = JSON.stringify(options.body, dateStringify_1.replacer);
        }
        // build the URL
        let url = options.url || '';
        url = options.baseUrl ? options.baseUrl + url : url;
        delete options.baseUrl;
        delete options.url;
        return node_fetch_1.default(url, options)
            .then(response => {
            if (!response.ok) {
                const err = new Error(response.statusText);
                return Promise.reject(err);
            }
            return response.json().then(hydrateDates);
        });
    }
}
exports.BadgeUpHttp = BadgeUpHttp;
/**
 * Hydrates dates in response bodies. Handles paginated responses and object responses.
 * Mutates input.
 * @param body HTTP response body
 */
function hydrateDates(body) {
    /**
     * Hydrates a string date to a Date object. Mutates input.
     * @param item object potentially containing a meta object
     */
    function hydrateMeta(item) {
        const meta = item.meta;
        if (meta && meta.created) {
            // parse ISO-8601 string to Date
            meta.created = new Date(meta.created);
        }
    }
    if (Array.isArray(body.data)) {
        // paginated response
        for (let item of body.data) {
            hydrateMeta(item);
        }
    }
    else {
        // object response
        hydrateMeta(body);
    }
    return body;
}
//# sourceMappingURL=http.js.map