'use strict';

const common = require('./../common');
const ENDPT = 'earnedachievements';

// Earned Achievements module
// @param context: The context to make requests in. Basically, `this`
module.exports = function earnedAchievements(context) {
    const obj = common(context, ENDPT);

    return {
        get: obj.get,
        getAll: obj.getAll,
        remove: obj.remove
    };
};
