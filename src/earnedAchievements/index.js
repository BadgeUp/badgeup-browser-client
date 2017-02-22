'use strict';

const check = require('check-types');
const common = require('./../common');
const collectQueryParams = require('../utils/collectQueryParams');
const querystring = require('querystring');

const ENDPT = 'earnedachievements';

const DELETE_QUERY_PARAMS = ['achievementId', 'subject', 'id'];

// Earned Achievements module
// @param context: The context to make requests in. Basically, `this`
module.exports = function earnedAchievements(context) {
    const obj = common(context, ENDPT);

    class EarnedAchievementQueryBuilder {
        constructor(context) {
            this.context = context;
        }

        achievementId(achievementId) {
            check.string(achievementId, 'achievementId must be a string');
            this.achievementId = achievementId;
            return this;
        }

        subject(subject) {
            check.string(subject, 'subject must be a string');
            this.subject = subject;
            return this;
        }

        id(id) {
            check.string(id, 'id must be a string');
            this.id = id;
            return this;
        }

        // delete all queried earned achievements
        // @param userOpts: option overrides for this request
        // @returns Returns a promise that resolves to an object stating the number of deleted metrics
        remove(userOpts) {
            const queryBy = collectQueryParams(this, DELETE_QUERY_PARAMS);

            if (Object.keys(queryBy).length === 0) {
                throw new Error('You must specify at least the "achievementId", "subject", or "id"');
            }

            return this.context.http.makeRequest({
                method: 'DELETE',
                url: `/v1/apps/${this.context.applicationId}/${ENDPT}?${querystring.stringify(queryBy)}`
            }, userOpts);
        }
    }

    // Sets up a delete request targeting earned achievements using query filters
    // @param queryBy: filters to query events by
    // @returns Returns an instance of the EarnedAchievementQueryBuilder class
    function query() {
        return new EarnedAchievementQueryBuilder(context);
    }

    return {
        get: obj.get,
        getAll: obj.getAll,
        query
    };
};
