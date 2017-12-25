'use strict';

const common = require('./../common');
const ENDPT = 'criteria';

/**
 * Criterion module
 * @param {object} context The context to make requests in. Basically, `this`
 */
module.exports = function criteria(context) {
    const obj = common(context, ENDPT);

    return {
        get: obj.get,
        getIterator: obj.getIterator,
        getAll: obj.getAll,
        create: obj.create,
        update: obj.update,
        remove: obj.remove
    };
};
