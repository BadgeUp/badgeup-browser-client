'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../src");
const INTEGRATION_API_KEY = process.env.INTEGRATION_API_KEY;
describe('integration tests', function () {
    this.timeout(5000);
    before(function () {
        if (!INTEGRATION_API_KEY) {
            this.skip();
        }
    });
    it('should get all achievement icons', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const achievementIcons = await client.achievementIcons.getAll();
        chai_1.expect(achievementIcons).to.be.an('array');
        chai_1.expect(achievementIcons).to.have.length.greaterThan(0, 'no icons found, possibly none were uploaded to the account against which integration tests are executed');
        achievementIcons.forEach((achievementIcon) => {
            chai_1.expect(achievementIcon.fileName).to.be.a('string');
            chai_1.expect(achievementIcon.url).to.be.a('string');
        });
    });
    it('should get all achievements', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const response = await client.achievements.getAll();
        chai_1.expect(response).to.be.an('array');
        chai_1.expect(response).to.have.length.greaterThan(0);
        response.forEach((achievement) => {
            checkAchievement(achievement);
        });
    });
    it('should get a single achievement by id', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const response = await client.achievements.getAll();
        for (const achievement of response) {
            const retrievedAchievement = await client.achievements.get(achievement.id);
            checkAchievement(retrievedAchievement);
        }
    });
    it('should create, update and remove an achievement, final number of achievements should remain the same', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const achievementsCountBefore = (await client.achievements.getAll()).length;
        const achievementRequest = {
            description: 'Test achievement to be deleted',
            options: { earnLimit: -1 },
            name: 'test achievement',
            evalTree: {
                type: 'GROUP',
                groups: [],
                condition: src_1.Condition.and,
                criteria: []
            }
        };
        const createdAchievement = await client.achievements.create(achievementRequest);
        checkAchievement(createdAchievement);
        chai_1.expect(createdAchievement.name).to.equal(achievementRequest.name);
        chai_1.expect(createdAchievement.description).to.equal(achievementRequest.description);
        chai_1.expect(createdAchievement.evalTree.condition).to.equal(achievementRequest.evalTree.condition);
        chai_1.expect(createdAchievement.evalTree.criteria).to.deep.equal(achievementRequest.evalTree.criteria);
        const updatedAchievement = await client.achievements.update(createdAchievement.id, [{ op: src_1.Operation.replace, path: '/name', value: 'Super Chef' }]);
        chai_1.expect(updatedAchievement).to.be.an('object');
        chai_1.expect(updatedAchievement.id).to.equal(createdAchievement.id);
        chai_1.expect(updatedAchievement.name).to.be.equal('Super Chef');
        const removedAchievement = await client.achievements.remove(createdAchievement.id);
        chai_1.expect(removedAchievement.id).to.be.equal(createdAchievement.id);
        const achievementsCountAfter = (await client.achievements.getAll()).length;
        chai_1.expect(achievementsCountBefore).to.equal(achievementsCountAfter, 'number of achievements changed. Probably client.achievements.remove failed');
    });
    it('should get all achievements via iterator', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const achievementsCount = (await client.achievements.getAll()).length;
        let countViaIterator = 0;
        for (const achievementPromise of client.achievements.getIterator()) {
            const achievement = await achievementPromise;
            checkAchievement(achievement);
            countViaIterator++;
        }
        chai_1.expect(achievementsCount).to.be.equal(countViaIterator, 'Number of achievements retrieved via .getAll and .getIterator is not equal.');
    });
    it('should get achievement criteria and awards', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const achievements = await client.achievements.getAll();
        let criterionExist = false;
        for (const achievement of achievements) {
            const criteria = await client.achievements.getAchievementCriteria(achievement.id);
            if (criteria.length > 0) {
                criterionExist = true;
            }
            for (const criterion of criteria) {
                chai_1.expect(criterion).to.be.an('object');
                chai_1.expect(criterion.applicationId).to.be.a('string');
                chai_1.expect(criterion.id).to.be.a('string');
                chai_1.expect(criterion.key).to.be.a('string');
                chai_1.expect(criterion.name).to.be.a('string');
                chai_1.expect(criterion.evaluation).to.be.an('object');
                chai_1.expect(criterion.evaluation.type).to.be.oneOf([src_1.CriterionType.timeseries, src_1.CriterionType.standard]);
                chai_1.expect(criterion.meta).to.be.an('object');
                chai_1.expect(criterion.meta.created).to.be.a('Date');
            }
        }
        chai_1.expect(criterionExist, 'At least one achievement should have at least one criterion').to.be.true;
        let awardExists = false;
        for (const achievement of achievements) {
            const awards = await client.achievements.getAchievementAwards(achievement.id);
            if (awards.length > 0) {
                awardExists = true;
            }
            for (const award of awards) {
                chai_1.expect(award).to.be.an('object');
                chai_1.expect(award.applicationId).to.be.a('string');
                chai_1.expect(award.id).to.be.a('string');
                chai_1.expect(award.name).to.be.a('string');
                chai_1.expect(award.meta).to.be.an('object');
                chai_1.expect(award.meta.created).to.be.a('Date');
            }
        }
        chai_1.expect(awardExists, 'At least one achievement should have at least one award.').to.be.true;
    });
    function checkAchievement(achievement) {
        chai_1.expect(achievement).to.be.an('object');
        chai_1.expect(achievement.applicationId).to.be.a('string');
        chai_1.expect(achievement.id).to.be.a('string');
        chai_1.expect(achievement.awards).to.be.an('array');
        chai_1.expect(achievement.evalTree).to.be.an('object');
        chai_1.expect(achievement.evalTree.condition).to.be.a('string');
        chai_1.expect(achievement.evalTree.criteria).to.be.an('array');
        achievement.evalTree.criteria.forEach((criterion) => {
            chai_1.expect(criterion).to.be.a('string');
        });
        chai_1.expect(achievement.evalTree.type).to.be.a('string');
    }
    it('should get applications via getAll and iterator', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const applications = await client.applications.getAll();
        chai_1.expect(applications).to.be.an('array');
        for (const application of applications) {
            checkApplication(application);
        }
        let countViaIterator = 0;
        for (const applicationPromise of client.applications.getIterator()) {
            const applicationViaIterator = await applicationPromise;
            checkApplication(applicationViaIterator);
            countViaIterator++;
        }
        chai_1.expect(countViaIterator).to.be.equal(applications.length, 'different number of applications received via .getAll and .getIterator methods');
    });
    function checkApplication(application) {
        chai_1.expect(application).to.be.an('object');
        chai_1.expect(application.id).to.be.a('string');
        chai_1.expect(application.name).to.be.a('string');
        chai_1.expect(application.meta).to.be.a('object');
        chai_1.expect(application.meta.demo).to.satisfy((val) => typeof val === 'boolean' || val === undefined);
        chai_1.expect(application.meta.created).to.be.a('Date');
    }
    it('should iterate earned achievements via iterator', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const iterator = client.earnedAchievements.getIterator();
        for (const achievementPromise of iterator) {
            const achievement = await achievementPromise;
            chai_1.expect(achievement).to.be.an('object');
            chai_1.expect(achievement.achievementId).to.be.a('string');
        }
    });
    it('should send an event and get progress back', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const rand = Math.floor(Math.random() * 100000);
        const subject = 'nodejs-ci-' + rand;
        const key = 'test';
        const eventRequest = new src_1.EventRequest(subject, key, { '@inc': 5 });
        const eventResponse = await client.events.create(eventRequest);
        chai_1.expect(eventResponse).to.be.an('object');
        const event = eventResponse.event;
        const progress = eventResponse.progress;
        chai_1.expect(event).to.be.an('object');
        chai_1.expect(event.key).to.be.equal(key);
        chai_1.expect(event.subject).to.be.equal(subject);
        chai_1.expect(progress).to.be.an('array');
        chai_1.expect(progress.length).to.be.greaterThan(0);
        chai_1.expect(progress[0].isComplete).to.equal(true);
        chai_1.expect(progress[0].isNew).to.equal(true);
        for (const prog of progress) {
            if (prog.isComplete && prog.isNew) {
                // from here you can use prog.achievementId and prog.earnedAchievementId to get the original achievement and awards objects
                const earnedAchievement = await client.earnedAchievements.get(prog.earnedAchievementId);
                chai_1.expect(earnedAchievement).to.be.an('object');
                chai_1.expect(earnedAchievement.id).to.be.a('string');
                chai_1.expect(earnedAchievement.achievementId).to.be.a('string');
                chai_1.expect(earnedAchievement.applicationId).to.be.a('string');
                chai_1.expect(earnedAchievement.subject).to.be.a('string');
                chai_1.expect(earnedAchievement.meta).to.be.an('object');
                chai_1.expect(earnedAchievement.meta.created).to.be.a('Date');
                const achievement = await client.achievements.get(prog.achievementId);
                chai_1.expect(achievement).to.be.an('object');
                chai_1.expect(achievement.id).to.be.a('string');
                chai_1.expect(achievement.applicationId).to.be.a('string');
                chai_1.expect(achievement.awards).to.be.an('array');
                chai_1.expect(achievement.evalTree).to.be.an('object');
                chai_1.expect(achievement.meta).to.be.an('object');
                chai_1.expect(achievement.meta.icon).to.be.a('string');
                chai_1.expect(achievement.meta.created).to.be.a('Date');
                chai_1.expect(achievement.name).to.be.a('string');
                chai_1.expect(achievement.options).to.be.an('object');
                chai_1.expect(achievement.resources).to.be.undefined;
                for (const awardId of achievement.awards) {
                    chai_1.expect(awardId).to.be.a('string');
                    const award = await client.awards.get(awardId);
                    chai_1.expect(award).to.be.an('object');
                    chai_1.expect(award.applicationId).to.be.a('string');
                    chai_1.expect(award.id).to.be.a('string');
                    chai_1.expect(award.data).to.be.an('object');
                    chai_1.expect(award.meta).to.be.an('object');
                    chai_1.expect(award.meta.created).to.be.a('Date');
                }
                for (const criterionId of Object.keys(prog.progressTree.criteria)) {
                    const criterion = await client.criteria.get(criterionId);
                    chai_1.expect(criterion).to.be.an('object');
                    chai_1.expect(criterion.id).to.equal(criterionId);
                }
            }
        }
    });
    it('should send an event and get progress back v2', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const rand = Math.floor(Math.random() * 100000);
        const subject = 'nodejs-ci-' + rand;
        const key = 'test';
        const eventRequest = new src_1.EventRequest(subject, key, { '@inc': 5 });
        const eventResponse = await client.events.createV2Preview(eventRequest);
        chai_1.expect(eventResponse).to.be.an('object');
        chai_1.expect(eventResponse.results).to.be.an('array');
        chai_1.expect(eventResponse.results).to.have.length.greaterThan(0);
        eventResponse.results.forEach((e) => {
            chai_1.expect(e).to.be.an('object');
            chai_1.expect(e.event).to.be.an('object');
            chai_1.expect(e.event.applicationId).to.be.a('string');
            chai_1.expect(e.event.id).to.be.a('string');
            chai_1.expect(e.event.key).to.be.a('string');
            chai_1.expect(e.event.subject).to.be.a('string');
        });
    });
    it('should get achievement progress for a subject', async function () {
        const client = new src_1.BadgeUp({ apiKey: INTEGRATION_API_KEY });
        const rand = Math.floor(Math.random() * 100000);
        const subject = 'nodejs-ci-' + rand;
        const key = 'test';
        const eventRequest = new src_1.EventRequest(subject, key, { '@inc': 5 });
        const eventResponse = await client.events.create(eventRequest);
        chai_1.expect(eventResponse).to.be.an('object'); // other tests check event response results
        const progressResponse = await client.progress.query().subject(subject).getAll();
        chai_1.expect(progressResponse).to.be.an('array');
        chai_1.expect(progressResponse.length).to.be.gte(1);
        chai_1.expect(progressResponse[0].isComplete).to.be.a('boolean');
        chai_1.expect(progressResponse[0].percentComplete).to.be.a('number');
        chai_1.expect(progressResponse[0].progressTree).to.be.an('object');
        chai_1.expect(progressResponse[0].achievementId).to.be.a('string');
        chai_1.expect(progressResponse[0].earnedAchievementId).to.be.a('string');
    });
});
//# sourceMappingURL=integration.spec.js.map