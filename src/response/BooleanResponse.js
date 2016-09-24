'use strict';

var BaseResponse = require('./BaseResponse');
var check = require('check-types');

module.exports = class BooleanResponse extends BaseResponse {
    constructor(complete) {
        check.assert.boolean(complete, 'complete must be a boolean');
        super('BOOLEAN');

        this.complete = complete;
    }
};
