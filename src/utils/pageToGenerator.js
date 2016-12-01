'use strict';

// turns a function that resolves with a page of items into a generator-powered iterator
// pageFn: function that may be called to retrieve the next page of data
function* pageToGenerator(pageFn) {
    let nextPageExists = true;
    let bank = [];
    let fetchPromise = Promise.resolve();
    while (bank.length > 0 || nextPageExists) {
        if (bank.length > 0) {
            yield Promise.resolve(bank.shift());
        } else {
            fetchPromise = fetchPromise.then(pageFn).then(function(response) {
                nextPageExists = !!response.pages.next;
                bank = response.data;

                return bank.shift();
            });

            yield fetchPromise;
        }
    }
}

module.exports = pageToGenerator;
