'use strict';

import { expect } from 'chai';
import { Achievement, AchievementRequest, BadgeUp, Condition, CriterionType, EarnedAchievement, EventRequest, Operation } from '../src';

const INTEGRATION_API_KEY = process.env.INTEGRATION_API_KEY;

function randomString() {
    return Math.random().toString(36).slice(2);
}

describe('integration tests', function() {
    this.timeout(5000);
    before(function() {
        if (!INTEGRATION_API_KEY) {
            this.skip();
        }
    });
    it('should get all achievement icons', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const achievementIcons = await client.achievementIcons.getAll();
        expect(achievementIcons).to.be.an('array');
        expect(achievementIcons).to.have.length.greaterThan(0, 'no icons found, possibly none were uploaded to the account against which integration tests are executed');
        achievementIcons.forEach((achievementIcon) => {
            expect(achievementIcon.fileName).to.be.a('string');
            expect(achievementIcon.url).to.be.a('string');
        });
    });

    it('should get all achievements', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const response = await client.achievements.getAll();
        expect(response).to.be.an('array');
        expect(response).to.have.length.greaterThan(0);
        response.forEach((achievement) => {
            checkAchievement(achievement);
        });
    });

    it('should get a single achievement by id', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const response = await client.achievements.getAll();
        for (const achievement of response) {
            const retrievedAchievement = await client.achievements.get(achievement.id);
            checkAchievement(retrievedAchievement);
        }
    });

    it('should create, update and remove an achievement, final number of achievements should remain the same', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const achievementsCountBefore = (await client.achievements.getAll()).length;
        const achievementRequest: AchievementRequest = {
            description: 'Test achievement to be deleted',
            options: { earnLimit: -1 },
            name: 'test achievement',
            evalTree: {
                type: 'GROUP',
                groups: [],
                condition: Condition.and,
                criteria: []
            }
        };

        const createdAchievement = await client.achievements.create(achievementRequest);
        checkAchievement(createdAchievement);
        expect(createdAchievement.name).to.equal(achievementRequest.name);
        expect(createdAchievement.description).to.equal(achievementRequest.description);
        expect(createdAchievement.evalTree.condition).to.equal(achievementRequest.evalTree!.condition);
        expect(createdAchievement.evalTree.criteria).to.deep.equal(achievementRequest.evalTree!.criteria);

        const updatedAchievement = await client.achievements.update(createdAchievement.id, [{ op: Operation.replace, path: '/name', value: 'Super Chef' }]);
        expect(updatedAchievement).to.be.an('object');
        expect(updatedAchievement.id).to.equal(createdAchievement.id);
        expect(updatedAchievement.name).to.be.equal('Super Chef');

        const removedAchievement = await client.achievements.remove(createdAchievement.id);
        expect(removedAchievement.id).to.be.equal(createdAchievement.id);

        const achievementsCountAfter = (await client.achievements.getAll()).length;
        expect(achievementsCountBefore).to.equal(achievementsCountAfter, 'number of achievements changed. Probably client.achievements.remove failed');

    });

    it('should get all achievements via iterator', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const achievementsCount = (await client.achievements.getAll()).length;
        let countViaIterator = 0;
        for (const achievementPromise of client.achievements.getIterator()) {
            const achievement = await achievementPromise;
            checkAchievement(achievement!);
            countViaIterator++;
        }
        expect(achievementsCount).to.be.equal(countViaIterator, 'Number of achievements retrieved via .getAll and .getIterator is not equal.');
    });

    it('should get achievement criteria and awards', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const achievements = await client.achievements.getAll();
        let criterionExist = false;
        for (const achievement of achievements) {
            const criteria = await client.achievements.getAchievementCriteria(achievement.id);
            if (criteria.length > 0) {
                criterionExist = true;
            }
            for (const criterion of criteria) {
                expect(criterion).to.be.an('object');
                expect(criterion.applicationId).to.be.a('string');
                expect(criterion.id).to.be.a('string');
                expect(criterion.key).to.be.a('string');
                expect(criterion.name).to.be.a('string');
                expect(criterion.evaluation).to.be.an('object');
                expect(criterion.evaluation.type).to.be.oneOf([CriterionType.timeseries, CriterionType.standard]);
                expect(criterion.meta).to.be.an('object');
                expect(criterion.meta.created).to.be.a('Date');
            }
        }
        expect(criterionExist, 'At least one achievement should have at least one criterion').to.be.true;

        let awardExists = false;
        for (const achievement of achievements) {
            const awards = await client.achievements.getAchievementAwards(achievement.id);
            if (awards.length > 0) {
                awardExists = true;
            }
            for (const award of awards) {
                expect(award).to.be.an('object');
                expect(award.applicationId).to.be.a('string');
                expect(award.id).to.be.a('string');
                expect(award.name).to.be.a('string');
                expect(award.meta).to.be.an('object');
                expect(award.meta.created).to.be.a('Date');
            }
        }

        expect(awardExists, 'At least one achievement should have at least one award.').to.be.true;
    });

    function checkAchievement(achievement: Achievement) {
        expect(achievement).to.be.an('object');
        expect(achievement.applicationId).to.be.a('string');
        expect(achievement.id).to.be.a('string');
        expect(achievement.awards).to.be.an('array');
        expect(achievement.evalTree).to.be.an('object');
        expect(achievement.evalTree.condition).to.be.a('string');
        expect(achievement.evalTree.criteria).to.be.an('array');
        achievement.evalTree.criteria.forEach((criterion) => {
            expect(criterion).to.be.a('string');
        });
        expect(achievement.evalTree.type).to.be.a('string');
    }

    it('should get applications via getAll and iterator', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const applications = await client.applications.getAll();
        expect(applications).to.be.an('array');
        for (const application of applications) {
            checkApplication(application);
        }

        let countViaIterator = 0;
        for (const applicationPromise of client.applications.getIterator()) {
            const applicationViaIterator = await applicationPromise;
            checkApplication(applicationViaIterator);
            countViaIterator++;
        }

        expect(countViaIterator).to.be.equal(applications.length, 'different number of applications received via .getAll and .getIterator methods');
    });

    function checkApplication(application) {
        expect(application).to.be.an('object');
        expect(application.id).to.be.a('string');
        expect(application.name).to.be.a('string');
        expect(application.meta).to.be.a('object');
        expect(application.meta.demo).to.satisfy((val) => typeof val === 'boolean' || val === undefined);
        expect(application.meta.created).to.be.a('Date');
    }

    it('should iterate earned achievements via iterator', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const iterator = client.earnedAchievements.getIterator();
        for (const achievementPromise of iterator) {
            const achievement: EarnedAchievement | undefined = await achievementPromise;
            if (!achievement) {
                continue; // last page may be empty
            }
            expect(achievement).to.be.an('object');
            expect(achievement!.achievementId).to.be.a('string');
        }
    });

    it('should send an event and get progress back', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const subject = 'nodejs-ci-' + randomString();
        const key = 'test';

        const eventRequest = new EventRequest(subject, key, { '@inc': 5 });

        const eventResponse = await client.events.create(eventRequest);
        expect(eventResponse).to.be.an('object');
        expect(eventResponse.results).to.be.an('array');
        expect(eventResponse.results).to.have.length.greaterThan(0);

        const event = eventResponse.results[0].event;
        const progress = eventResponse.results[0].progress;

        expect(event).to.be.an('object');
        expect(event.key).to.be.equal(key);
        expect(event.subject).to.be.equal(subject);

        expect(progress).to.be.an('array');
        expect(progress.length).to.be.greaterThan(0);
        expect(progress[0].isComplete).to.equal(true);
        expect(progress[0].isNew).to.equal(true);

        for (const prog of progress) {
            if (prog.isComplete && prog.isNew) {
                // from here you can use prog.achievementId and prog.earnedAchievementId to get the original achievement and awards objects
                const earnedAchievement = await client.earnedAchievements.get(prog.earnedAchievementId);
                expect(earnedAchievement).to.be.an('object');
                expect(earnedAchievement.id).to.be.a('string');
                expect(earnedAchievement.achievementId).to.be.a('string');
                expect(earnedAchievement.applicationId).to.be.a('string');
                expect(earnedAchievement.subject).to.be.a('string');
                expect(earnedAchievement.meta).to.be.an('object');
                expect(earnedAchievement.meta.created).to.be.a('Date');

                const achievement = await client.achievements.get(prog.achievementId);
                expect(achievement).to.be.an('object');
                expect(achievement.id).to.be.a('string');
                expect(achievement.applicationId).to.be.a('string');
                expect(achievement.awards).to.be.an('array');
                expect(achievement.evalTree).to.be.an('object');
                expect(achievement.meta).to.be.an('object');
                expect(achievement.meta.icon).to.be.a('string');
                expect(achievement.meta.created).to.be.a('Date');
                expect(achievement.name).to.be.a('string');
                expect(achievement.options).to.be.an('object');
                expect(achievement.resources).to.be.undefined;

                for (const awardId of achievement.awards) {
                    expect(awardId).to.be.a('string');
                    const award = await client.awards.get(awardId);
                    expect(award).to.be.an('object');
                    expect(award.applicationId).to.be.a('string');
                    expect(award.id).to.be.a('string');
                    expect(award.data).to.be.an('object');
                    expect(award.meta).to.be.an('object');
                    expect(award.meta.created).to.be.a('Date');
                }

                for (const criterionId of Object.keys(prog.progressTree.criteria)) {
                    const criterion = await client.criteria.get(criterionId);
                    expect(criterion).to.be.an('object');
                    expect(criterion.id).to.equal(criterionId);
                }
            }
        }
    });

    it('should get achievement progress for a subject', async function() {
        const client = new BadgeUp({ apiKey: INTEGRATION_API_KEY });

        const subject = 'nodejs-ci-' + randomString();
        const key = 'test';

        const eventRequest = new EventRequest(subject, key, { '@inc': 5 });

        const eventResponse = await client.events.create(eventRequest);
        expect(eventResponse).to.be.an('object'); // other tests check event response results

        const progressResponse = await client.progress.query().subject(subject).getAll();

        expect(progressResponse).to.be.an('array');
        expect(progressResponse.length).to.be.gte(1);
        expect(progressResponse[0].isComplete).to.be.a('boolean');
        expect(progressResponse[0].percentComplete).to.be.a('number');
        expect(progressResponse[0].progressTree).to.be.an('object');
        expect(progressResponse[0].achievementId).to.be.a('string');
        expect(progressResponse[0].earnedAchievementId).to.be.a('string');
    });
});
