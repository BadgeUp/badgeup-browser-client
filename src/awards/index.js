'use strict';

const common = require('./../common');
const ENDPT = 'awards';

// Awards module
// @param context: The context to make requests in. Basically, `this`
module.exports = function awards(context) {
    return common(context, ENDPT);
};
