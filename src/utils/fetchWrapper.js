'use strict';

const fetchWrapper = function fetchWrapper(options) {
    if (!options || typeof options !== 'object') {
        throw new Error('options object must be provided and must be an object');
    }

    if (!options.baseUrl && !options.url) {
        throw new Error('options.baseUrl or options.url must be provided and must be a string');
    }

    // build the URL
    let url = options.url || '';
    url = options.baseUrl ? options.baseUrl + url : url;
    delete options.baseUrl;
    delete options.url;

    const simple = (options.simple === undefined) ? true : false;
    delete options.simple;
    return fetch(url, options).then(function(response) {
        if (!response.ok) {
            return Promise.reject(response);
        }
        return response;
    });
};

// export the wrapped got instance
module.exports = fetchWrapper;
