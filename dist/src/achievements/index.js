"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check = require("check-types");
const common_1 = require("../common");
const ENDPT = 'achievements';
/**
 * Achievements resource
 */
class AchievementsResource {
    /**
     * Construct the achievements resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.context = context;
        this.common = new common_1.Common(context, ENDPT);
    }
    /**
     * Retrieve an achievement by ID
     * @param id ID of the achievement to retrieve
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the retrieved achievement
     */
    get(id, userOpts) {
        return this.common.get(id, userOpts);
    }
    /**
     * Retrieve all achievements, returned as an iterator
     * @param userOpts option overrides for this request
     * @return An iterator that returns promises that resolve with the next achievement
     */
    getIterator(userOpts) {
        return this.common.getIterator(userOpts);
    }
    /**
     * Retrieve all achievements, returned as an array
     * @param userOpts option overrides for this request
     * @returns Promise that resolves to an array of achievements
     */
    getAll(userOpts) {
        return this.common.getAll(userOpts);
    }
    /**
     * Updates an achievement by ID
     * @param id ID of the achievement to be updated
     * @param updates JSON patch updates
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the updated achievement
     */
    update(id, updates, userOpts) {
        return this.common.update(id, updates, userOpts);
    }
    /**
     * Create an achievement
     * @param achievement Sub-resource to achievement to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided achievement
     */
    create(achievement, userOpts) {
        return this.common.create(achievement, userOpts);
    }
    /**
     * Delete an achievement by ID
     * @param id ID of the achievement to delete
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the deleted achievement
     */
    remove(id, userOpts) {
        return this.common.remove(id, userOpts);
    }
    /**
     * Retrieves the list of criteria associated with an achievement
     * @param id ID of the achievement to retrieve criteria for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the list of criteria
     */
    getAchievementCriteria(id, userOpts) {
        check.assert.string(id, 'id must be a string');
        return this.context.http.makeRequest({
            url: `/v1/apps/${this.context.applicationId}/${ENDPT}/${id}/criteria`
        }, userOpts).then(function (body) { return body.data; });
    }
    /**
     * Retrieves the list of awards associated with an achievement
     * @param id ID of the achievement to retrieve criteria for
     * @param userOpts option overrides for this request
     * @returns Promise that resolves with the list of awards
     */
    getAchievementAwards(id, userOpts) {
        check.assert.string(id, 'id must be a string');
        return this.context.http.makeRequest({
            url: `/v1/apps/${this.context.applicationId}/${ENDPT}/${id}/awards`
        }, userOpts).then((body) => {
            return body.data;
        });
    }
}
exports.AchievementsResource = AchievementsResource;
//# sourceMappingURL=index.js.map