'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

function generateFakeJobResult() {
    return {
        id: Math.floor(Math.random() * 1e6),
        subject: 'kram',
        key: 'event:key',
        modifier: { '@inc': 5 },
        timestamp: Date.now(),
        options: null,
        data: null
    };
}

describe('job results', function() {
    it('should get a single job result', function*() {
        const jobResult = generateFakeJobResult();
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [jobResult]
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/jobresult?id=${jobResult.id}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.jobResults.query().id(jobResult.id).getAll({ _payload, _validate });

        expect(result).to.be.an('array');
    });

    it('should get all job results', function*() {
        const jobResult = generateFakeJobResult();

        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(jobResult)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v1/apps/1337/jobresult?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(jobResult)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v1/apps/1337/jobresult?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v1/apps/1337/jobresult?');
            }
            expect(options.headers).to.be.an('object');
        }

        let count = 0;
        for (let jobResult of bup.jobResults.query().getIterator({ _payload, _validate })) {
            count++;
            jobResult = yield jobResult;
            expect(jobResult).to.be.an('object');
        }

        // total number of events
        expect(count).to.equal(20);
    });

    it('should get multiple job results for a subject', function*() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: []
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/jobresult?subject=100`);
            expect(options.headers).to.be.an('object');
        }

        yield bup.jobResults.query().subject('100').getAll({ _payload, _validate });
    });

    it('should get multiple job results for a criterion ID', function*() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: []
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/jobresult?criterionId=foo`);
            expect(options.headers).to.be.an('object');
        }

        yield bup.jobResults.query().criterionId('foo').getAll({ _payload, _validate });
    });

    it('should sort multiple job results by ID', function*() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: []
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/jobresult?sort=id%3Adesc`);
            expect(options.headers).to.be.an('object');
        }

        yield bup.jobResults.query().sort('id', 'desc').getAll({ _payload, _validate });
    });

});
