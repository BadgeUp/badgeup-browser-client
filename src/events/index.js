'use strict';

const common = require('./../common');
const ENDPT = 'events';

// Events module
// @param context: The context to make requests in. Basically, `this`
module.exports = function events(context) {
    const obj = common(context, ENDPT);

    return {
        create: obj.create
    };
};
