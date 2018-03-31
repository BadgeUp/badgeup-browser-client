'use strict';

import { expect } from 'chai';
import { BadgeUp } from './../src';

const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

function generateFakeEarnedAchievement() {
    return {
        id: Math.floor(Math.random() * 1e6),
        achievementId: Math.floor(Math.random() * 1e6),
        applicationId: '1337',
        subject: '100',
        meta: {
            created: (new Date()).toISOString()
        },
        earnedAchievementsCount: 20
    };
}

describe('earned achievements', function() {
    it('should get all earned Achievements with an iterator', async function() {
        const achievement = generateFakeEarnedAchievement();

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
                        next: '/v1/apps/1337/earnedachievements/?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(achievement)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v1/apps/1337/earnedachievements/?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v1/apps/1337/earnedachievements');
            }
            expect(options.headers).to.be.an('object');
        }

        let count = 0;
        for (const summary of bup.earnedAchievements.getIterator({ _payload, _validate })) {
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
                data: [ generateFakeEarnedAchievement() ]
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?subject=100`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().subject('100').getAll({ _payload, _validate });
    });

    it('should get by achievementId', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAchievement() ]
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?achievementId=100`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().achievementId('100').getAll({ _payload, _validate });
    });

    it('should get earned achievements created after a certain time', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAchievement() ]
            };
        }

        const date = new Date();

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?since=${encodeURIComponent(date.toISOString())}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().since(date).getAll({ _payload, _validate });
    });

    it('should get earned achievements created before a certain time', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAchievement() ]
            };
        }

        const date = new Date();

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?until=${encodeURIComponent(date.toISOString())}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().until(date).getAll({ _payload, _validate });
    });

    it('should get by subject, achievementId, and since & until', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAchievement() ]
            };
        }

        const since = new Date();
        const until = new Date();

        function _validate(options) {
            expect(options.url).to.equal('/v1/apps/1337/earnedachievements?subject=100&achievementId=100&since='
                + `${encodeURIComponent(since.toISOString())}&until=${encodeURIComponent(until.toISOString())}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query()
            .subject('100')
            .achievementId('100')
            .since(since)
            .until(until)
            .getAll({ _payload, _validate });
    });

    it('should remove by subject', async function() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?subject=100`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().subject('100').remove({ _payload, _validate });
    });

    it('should remove by achievementId', async function() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?achievementId=100`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().achievementId('100').remove({ _payload, _validate });
    });

    it('should remove earned achievements created after a certain time', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAchievement() ]
            };
        }

        const date = new Date();

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?since=${encodeURIComponent(date.toISOString())}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().since(date).remove({ _payload, _validate });
    });

    it('should remove earned achievements created before a certain time', async function() {
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [ generateFakeEarnedAchievement() ]
            };
        }

        const date = new Date();

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?until=${encodeURIComponent(date.toISOString())}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query().until(date).remove({ _payload, _validate });
    });

    it('should remove by subject and achievementId', async function() {
        function _payload() {
            return { count: 5 };
        }

        const since = new Date();
        const until = new Date();

        function _validate(options) {
            expect(options.url).to.equal('/v1/apps/1337/earnedachievements?subject=100&achievementId=100&since='
                + `${encodeURIComponent(since.toISOString())}&until=${encodeURIComponent(until.toISOString())}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        await bup.earnedAchievements.query()
            .subject('100')
            .achievementId('100')
            .since(since)
            .until(until)
            .remove({ _payload, _validate });
    });
});
