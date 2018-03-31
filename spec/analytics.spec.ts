import { expect } from 'chai';
import { BadgeUp } from './../src';
const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

function generateFakeSubjectStats() {
    return {
        subject: '100',
        metricsCount: 10,
        eventsCount: 1000,
        earnedAchievementsCount: 20
    };
}

describe('Analytics', function() {
    it('should get all subject snapshots with an iterator', async function() {
        const fakeSubjectStats = generateFakeSubjectStats();

        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(fakeSubjectStats)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v1/apps/1337/analytics/subjects/summary?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(fakeSubjectStats)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v1/apps/1337/analytics/subjects/summary?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v1/apps/1337/analytics/subjects/summary');
            }
            expect(options.headers).to.be.an('object');
        }

        let count = 0;
        for (const summary of bup.analytics.getSubjectsSummaryIterator({ _payload, _validate })) {
            count++;
            const tmp = await summary;
            expect(tmp).to.be.an('object');
        }

        // total number of results
        expect(count).to.equal(20);
    });

    it('should get all metric keys', async function() {
        function _payload() {
            return Promise.resolve({
                data: ['foo']
            });
        }

        function _validate(options) {
            expect(options.url).to.equal('/v1/apps/1337/analytics/metrics/keys');
        }

        const result = await bup.analytics.getAllMetricKeys({ _payload, _validate });

        expect(result).to.be.an('array');
        expect(result[0]).to.equal('foo');
    });
});
