import { expect } from 'chai';
import { BadgeUp } from './../src';
const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

function generateFakeCriterion() {
    return {
        id: '' + Math.floor(Math.random() * 1e6),
        name: 'criterion',
        description: 'criterion description',
        key: 'a:crit',
        operator: '@gt',
        threshold: 100
    };
}

describe('criterion', function() {
    it('should get a single criterion', async function() {
        const criterion = generateFakeCriterion();
        function _payload() {
            return criterion;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/criteria/${criterion.id}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        const result = await bup.criteria.get(criterion.id, { _payload, _validate });

        expect(result).to.be.an('object');
    });

    it('should get all criteria', async function() {
        const criterion = generateFakeCriterion();
        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(criterion)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v1/apps/1337/criteria?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(criterion)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v1/apps/1337/criteria?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v1/apps/1337/criteria');
            }
            expect(options.headers).to.be.an('object');
        }

        const criteria = await bup.criteria.getAll({ _payload, _validate });

        // total number of criteria
        expect(criteria.length).to.equal(20);

    });

    it('should create a criterion', async function() {
        const criterion = generateFakeCriterion();
        function _payload() {
            return criterion;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/criteria`);
            expect(options.method).to.equal('POST');
            expect(options.headers).to.be.an('object');
        }

        const result = await bup.criteria.create(criterion, { _payload, _validate });

        expect(result).to.eql(criterion);
    });

    it('should remove a criterion', async function() {
        const criterion = generateFakeCriterion();
        function _payload() {
            return criterion;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/criteria/${criterion.id}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        const result = await bup.criteria.remove(criterion.id, { _payload, _validate });

        expect(result).to.eql(criterion);
    });
});
