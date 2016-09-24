'use strict';

var check = require('check-types');

module.exports = class BaseResponse {
    constructor(type) {
        check.assert.string(type, 'type must be a string');

        this.type = type;
    }
};
