'use strict';

const dateStringify = require('./dateStringify');

const fetchWrapper = function fetchWrapper(options) {
    if (!options || typeof options !== 'object') {
        throw new Error('options object must be provided and must be an object');
    }

    if (!options.baseUrl && !options.url) {
        throw new Error('options.baseUrl or options.url must be provided and must be a string');
    }

    // stringify object and array bodies
    if (options.json === true && options.body && (typeof options.body === 'object' || Array.isArray(options.body))) {
        options.headers = options.headers || {};
        options.headers['Content-Type'] = 'application/json';
        // stringify dates to include timezones
        options.body = dateStringify(options.body);
        options.body = JSON.stringify(options.body);
    }

    // build the URL
    let url = options.url || '';
    url = options.baseUrl ? options.baseUrl + url : url;
    delete options.baseUrl;
    delete options.url;

    return fetch(url, options).then(function(response) {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response;
    });
};

// export the wrapped got instance
module.exports = fetchWrapper;
