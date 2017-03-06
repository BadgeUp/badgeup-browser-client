'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    applicationId: '1337',
    apiKey: 'Co0kieMonst3r'
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
    it('should get all earned Achievements with an iterator', function*() {
        const summary = generateFakeEarnedAchievement();

        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(summary)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v1/apps/1337/earnedachievements/?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(summary)
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
        for (let summary of bup.earnedAchievements.getIterator({ _payload, _validate })) {
            count++;
            summary = yield summary;
            expect(summary).to.be.an('object');
        }

        // total number of results
        expect(count).to.equal(20);
    });

    it('should get by subject', function*() {
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
            expect(options.method).any.to.equal(undefined, 'GET');
            expect(options.headers).to.be.an('object');
        }

        yield bup.earnedAchievements.query().subject('100').getAll({ _payload, _validate });
    });

    it('should get by achievementId', function*() {
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
            expect(options.method).any.to.equal(undefined, 'GET');
            expect(options.headers).to.be.an('object');
        }

        yield bup.earnedAchievements.query().achievementId('100').getAll({ _payload, _validate });
    });

    it('should get by both subject and achievementId', function*() {
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
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?subject=100&achievementId=100`);
            expect(options.method).any.to.equal(undefined, 'GET');
            expect(options.headers).to.be.an('object');
        }

        yield bup.earnedAchievements.query().subject('100').achievementId('100').getAll({ _payload, _validate });
    });

    it('should remove by id', function*() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?id=100`);
            expect(options.method).any.to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        yield bup.earnedAchievements.query().id('100').remove({ _payload, _validate });
    });

    it('should remove by subject', function*() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?subject=100`);
            expect(options.method).any.to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        yield bup.earnedAchievements.query().subject('100').remove({ _payload, _validate });
    });

    it('should remove by achievementId', function*() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?achievementId=100`);
            expect(options.method).any.to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        yield bup.earnedAchievements.query().achievementId('100').remove({ _payload, _validate });
    });

    it('should remove by both subject and achievementId', function*() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/earnedachievements?subject=100&achievementId=100`);
            expect(options.method).any.to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        yield bup.earnedAchievements.query().subject('100').achievementId('100').remove({ _payload, _validate });
    });
});