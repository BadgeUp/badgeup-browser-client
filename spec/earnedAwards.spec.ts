'use strict';

import { expect } from 'chai';
import { BadgeUp } from './../src';

const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

function generateFakeEarnedAward() {
    return {
        id: Math.floor(Math.random() * 1e6),
        awardId: Math.floor(Math.random() * 1e6),
        earnedAwardId: Math.floor(Math.random() * 1e6),
        applicationId: '1337',
        subject: '100',
        meta: {
            created: (new Date()).toISOString()
        },
        earnedAchievementsCount: 20
    };
}

describe('earned awards', function() {
    it('should get all earned Achievements with an iterator', async function() {
        const achievement = generateFakeEarnedAward();

        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(achievement)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v2/apps/1337/earnedawards/?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(achievement)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v2/apps/1337/earnedawards/?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v2/apps/1337/earnedawards');
            }
            expect(options.headers).to.be.an('object');
        }

        let count = 0;
        for (const summary of bup.earnedAwards.getIterator({ _payload, _validate })) {
            count++;
            const tmp = await summary;
            expect(tmp).to.be.an('object');
        }

        // total number of results
        expect(count).to.equal(20);
    });

    it('should get by subject', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAward() ]
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v2/apps/1337/earnedawards?subject=100`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAwards.query().subject('100').getAll({ _payload, _validate });
    });

    it('should get by earnedAchievementId', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAward() ]
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v2/apps/1337/earnedawards?earnedAchievementId=100`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAwards.query().earnedAchievementId('100').getAll({ _payload, _validate });
    });

    it('should get earned awards created after a certain time', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAward() ]
            };
        }

        const date = new Date();

        function _validate(options) {
            expect(options.url).to.equal(`/v2/apps/1337/earnedawards?since=${encodeURIComponent(date.toISOString())}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAwards.query().since(date).getAll({ _payload, _validate });
    });

    it('should get earned awards created before a certain time', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAward() ]
            };
        }

        const date = new Date();

        function _validate(options) {
            expect(options.url).to.equal(`/v2/apps/1337/earnedawards?until=${encodeURIComponent(date.toISOString())}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAwards.query().until(date).getAll({ _payload, _validate });
    });

    it('should get by subject, since, and until', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAward() ]
            };
        }

        const since = new Date();
        const until = new Date();

        function _validate(options) {
            expect(options.url).to.equal('/v2/apps/1337/earnedawards?subject=100&'
                + `since=${encodeURIComponent(since.toISOString())}&until=${encodeURIComponent(until.toISOString())}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAwards.query()
            .subject('100')
            .since(since)
            .until(until)
            .getAll({ _payload, _validate });
    });
});
