'use strict';

const _got = require('got');
const dateStringify = require('./dateStringify');

const gotWrapper = function gotWrapper(options) {
    if (!options || typeof options !== 'object') {
        throw new Error('options object must be provided and must be an object');
    }

    if (!options.baseUrl && !options.url) {
        throw new Error('options.baseUrl or options.url must be provided and must be a string');
    }

    if (options.json === true && options.body && (typeof options.body === 'object' || Array.isArray(options.body))) {
        // stringify dates to include timezones
        options.body = dateStringify(options.body);
    }

    // build the URL
    let url = options.url || '';
    url = options.baseUrl ? options.baseUrl + url : url;
    delete options.baseUrl;
    delete options.url;

    const simple = (options.simple === undefined) ? true : false;
    delete options.simple;

    return _got(url, options).then(function(response) {
        return Promise.resolve(response);
    }, function(reason) {
        if (!simple && reason instanceof _got.HTTPError) {
            return Promise.resolve(reason.response);
        }
        return Promise.reject(reason);
    });
};

// export the wrapped got instance
module.exports = Object.assign(gotWrapper, _got);
