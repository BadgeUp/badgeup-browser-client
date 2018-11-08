"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const check = __importStar(require("check-types"));
const pageToGenerator_1 = require("./../utils/pageToGenerator");
const ENDPT = 'progress';
class ProgressQueryBuilder {
    constructor(context) {
        // container for the query parameters
        this.params = new URLSearchParams();
        this.context = context;
    }
    /**
     * Query by achievement ID
     * @param achievementId
     */
    achievementId(achievementId) {
        check.assert.string(achievementId, 'achievementId must be a string');
        this.params.set('achievementId', achievementId);
        return this;
    }
    /**
     * Query by subject
     * @param subject
     */
    subject(subject) {
        check.assert.string(subject, 'subject must be a string');
        this.params.set('subject', subject);
        return this;
    }
    /**
     * Include additional resources in the response
     * @param resource
     */
    include(resource) {
        // remove any existing includes
        this.params.append('include', resource);
        return this;
    }
    /**
     * Retrieve all queried progress objects, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of progress objects
     */
    getAll(userOpts) {
        if (!this.params.has('subject')) {
            throw new Error('subject must be provided');
        }
        let array = [];
        let url = `/v2/apps/${this.context.applicationId}/${ENDPT}?${this.params.toString()}`;
        const pageFn = () => {
            return this.context.http.makeRequest({ url }, userOpts).then(function (body) {
                array = array.concat(body.data || []); // concatenate the new data
                url = body.pages.next;
                if (url) {
                    return pageFn();
                }
                else {
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
    *getIterator(userOpts) {
        if (!this.params.has('subject')) {
            throw new Error('subject must be provided');
        }
        const pageFn = () => {
            let url = `/v2/apps/${this.context.applicationId}/${ENDPT}?${this.params.toString()}`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function (body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };
        yield* pageToGenerator_1.pageToGenerator(pageFn());
    }
}
exports.ProgressQueryBuilder = ProgressQueryBuilder;
/**
 * Progress resource
 */
class ProgressResource {
    /**
     * Construct the Progress resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * @returns Returns an instance of the ProgressQueryBuilder class
     */
    query() {
        return new ProgressQueryBuilder(this.context);
    }
}
exports.ProgressResource = ProgressResource;
//# sourceMappingURL=index.js.map