'use strict';

const common = require('./../common');
const ENDPT = 'achievements';

// Achievements module
// @param context: The context to make requests in. Basically, `this`
module.exports = function achievements(context) {
    return common(context, ENDPT);
};
