'use strict';

const common = require('./../common');
const ENDPT = 'criteria';

// Criterion module
// @param context: The context to make requests in. Basically, `this`
module.exports = function criteria(context) {
    return common(context, ENDPT);
};
