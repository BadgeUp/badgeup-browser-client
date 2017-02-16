'use strict';

const pickBy = require('lodash.pickby');
const includes = require('lodash.includes');

module.exports = function collectQueryParams(source, keys) {
    return pickBy(source, function(value, key) {
        // TODO switch to Array.prototype.includes when we drop support for Node v4
        return !!value && includes(keys, key);
    });
};
