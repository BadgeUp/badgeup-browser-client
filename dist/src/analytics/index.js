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
const pageToGenerator_1 = require("../utils/pageToGenerator");
const ENDPT = 'analytics';
/**
 * Analytics resource
 * USE OF THE ANALYTICS RESOURCE IS NOT RECOMMENDED (AT THIS TIME)
 * THIS RESOURCE IS NOT SUBJECT TO ANY SLAS AND MAY BE CHANGED AT ANY TIME
 */
class AnalyticsResource {
    /**
     * Construct the analytics resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * Retrieve event analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    eventsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}/events/last-n-days?duration=${numDays}`
        }, userOpts);
    }
    /**
     * Retrieve event analytics for a single subject
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    eventsLastNDaysBySubject(numDays, subject, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');
        check.assert.string(subject, 'subject must be a string');
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}/events/last-n-days/subject/${subject}?duration=${numDays}`
        }, userOpts);
    }
    /**
     * Retrieve subject analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    subjectsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}/subjects/last-n-days?duration=${numDays}`
        }, userOpts);
    }
    /**
     * Retrieve new subject analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    newSubjectsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}/subjects/new/last-n-days?duration=${numDays}`
        }, userOpts);
    }
    /**
     * Retrieve earned achievement analytics
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved object
     */
    earnedAchievementsLastNDays(numDays, userOpts) {
        check.assert(check.integer(numDays) && check.greater(numDays, 0), 'numDays must be a positive integer');
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}/earnedachievements/last-n-days?duration=${numDays}`
        }, userOpts);
    }
    /**
     * Retrieve subject summary list
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next object
     */
    *getSubjectsSummaryIterator(userOpts) {
        const pageFn = () => {
            let url = `/v2/apps/${this.context.applicationId}/${ENDPT}/subjects/summary`;
            return () => {
                return this.context.http.makeRequest({ url }, userOpts).then(function (body) {
                    url = body.pages.next;
                    return body;
                });
            };
        };
        yield* pageToGenerator_1.pageToGenerator(pageFn());
    }
    /**
     * Retrieve a list of unique metric keys
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with an array of retrieved metric keys
     */
    getAllMetricKeys(userOpts) {
        return this.context.http.makeRequest({
            url: `/v2/apps/${this.context.applicationId}/${ENDPT}/metrics/keys`
        }, userOpts).then(obj => obj.data);
    }
}
exports.AnalyticsResource = AnalyticsResource;
//# sourceMappingURL=index.js.map