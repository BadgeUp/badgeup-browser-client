'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
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
});
