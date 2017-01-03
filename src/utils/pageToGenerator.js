'use strict';

// turns a function that resolves with a page of items into a generator-powered iterator
// pageFn: function that may be called to retrieve the next page of data
function* pageToGenerator(pageFn) {
    let nextPageExists = true;
    let bank = [];
    let fetchPromise = Promise.resolve();
    while (bank.length > 0 || nextPageExists) {

        fetchPromise = fetchPromise.then(function() {
            if (bank.length === 0) {
                return pageFn().then(function(response) {
                    nextPageExists = !!response.pages.next;
                    bank = response.data;

                    return bank.shift();
                });
            }

            return bank.shift();
        });

        yield fetchPromise;
    }
}

module.exports = pageToGenerator;
