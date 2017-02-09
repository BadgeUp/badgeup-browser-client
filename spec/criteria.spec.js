'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    applicationId: '1337',
    apiKey: 'Co0kieMonst3r'
});

function generateFakeCriterion() {
    return {
        id: Math.floor(Math.random() * 1e6),
        name: 'criterion',
        description: 'criterion description',
        key: 'a:crit',
        operator: "@gt",
        threshold: 100
    };
}

describe('criterion', function() {
    it('should get a single criterion', function*() {
        const criterion = generateFakeCriterion();
        function _payload() {
            return criterion;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/criteria/${criterion.id}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.criteria.get(criterion.id, { _payload, _validate });

        expect(result).to.be.an('object');
    });

    xit('should get all criteria', function() {
        // TODO
    });

    it('should create a criterion', function*() {
        const criterion = generateFakeCriterion();
        function _payload() {
            return criterion;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/criteria`);
            expect(options.method).to.equal('POST');
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.criteria.create(criterion, { _payload, _validate });

        expect(result).to.eql(criterion);
    });

    it('should remove a criterion', function*() {
        const criterion = generateFakeCriterion();
        function _payload() {
            return criterion;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/criteria/${criterion.id}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.criteria.remove(criterion.id, { _payload, _validate });

        expect(result).to.eql(criterion);
    });

    it('should get all dynamic criteria images', function*() {
        const dcImages = {
            node: [
                {
                    runtimeVersion: '6.9.4',
                    clientVersion: '0.4.0',
                    imageVersion: '1.0.1',
                    tag: '6.9.4-0.4.0-1.0.1',
                    created: new Date()
                }
            ]
        };
        function _payload() {
            return dcImages;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/dcimages`);
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.criteria.getDynamicCriteriaImages({ _payload, _validate });

        expect(result).to.eql(dcImages);
    });
});
