'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    applicationId: '1337',
    apiKey: 'Co0kieMonst3r'
});

function generateFakeMetric() {
    return {
        subject: 'kram',
        key: 'event:key',
        value: 10
    };
}

describe('metrics', function() {
    it('should get a metric', function*() {
        const metric = generateFakeMetric();
        function _payload() {
            return metric;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/metrics/${metric.subject}/${metric.key}`);
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.metrics.getIndividualSubjectMetric(metric.subject, metric.key, { _payload, _validate });

        expect(result).to.eql(metric);
    });

    it('should get all metrics with an iterator', function*() {
        const event = generateFakeMetric();

        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(event)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v1/apps/1337/metrics?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(event)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v1/apps/1337/metrics?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v1/apps/1337/metrics');
            }
            expect(options.headers).to.be.an('object');
        }

        let count = 0;
        for (let event of bup.metrics.getIterator({ _payload, _validate })) {
            count++;
            event = yield event;
            expect(event).to.be.an('object');
        }

        // total number of metrics
        expect(count).to.equal(20);
    });

    it('should get all metrics with an array', function*() {
        const event = generateFakeMetric();

        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(event)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v1/apps/1337/metrics?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(event)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v1/apps/1337/metrics?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v1/apps/1337/metrics');
            }
            expect(options.headers).to.be.an('object');
        }

        let metrics = yield bup.metrics.getAll({ _payload, _validate });

        // total number of metrics
        expect(metrics.length).to.equal(20);
    });

    it('should create a metric', function*() {
        const metric = generateFakeMetric();
        function _payload() {
            return metric;
        }

        function _validate(options) {
            expect(options.url).to.equal('/v1/apps/1337/metrics');
            expect(options.method).to.equal('POST');
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.metrics.create(metric, { _payload, _validate });

        expect(result).to.eql(metric);
    });

    it('should delete a metric', function*() {
        const metric = generateFakeMetric();
        function _payload() {
            return metric;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/metrics/${metric.subject}/${metric.key}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.metrics.removeIndividualSubjectMetric(metric.subject, metric.key, { _payload, _validate });

        expect(result).to.eql(metric);
    });
});
