/**
 * Turns a function that resolves with a page of items into a generator-powered iterator
 * @param pageFn function that may be called to retrieve the next page of data
 */
export function* pageToGenerator<T>(pageFn: () => Promise<PaginatedData<T>>): IterableIterator<Promise<T | undefined>>  {
    let nextPageExists = true;
    let bank: T[] = [];
    let fetchPromise = Promise.resolve<T | undefined>(undefined);
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

/**
 * Data represented in multiple pages
 */
export interface PaginatedData<T> {
    pages: {
        previous: string | null;
        next: string | null;
    };
    data: T[];
}
