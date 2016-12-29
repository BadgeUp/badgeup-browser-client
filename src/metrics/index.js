'use strict';

const common = require('./../common');
const ENDPT = 'metrics';

// Metrics module
// @param context: The context to make requests in. Basically, `this`
module.exports = function metrics(context) {
    return common(context, ENDPT);
};
