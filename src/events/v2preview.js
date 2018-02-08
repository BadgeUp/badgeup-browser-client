'use strict';

const common = require('./../common');
const defaults = require('lodash.defaultsdeep');

const ENDPT = 'events';
const API_PREVIEW = {
    headers: {
        'X-V2-PREVIEW': true
    }
};

/**
 * Events module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function events(context) {
    const obj = common(context, ENDPT);

    function create(object, userOpts) {
        return obj.create(object, defaults({}, userOpts, API_PREVIEW));
    }

    return {
        create
    };
};
