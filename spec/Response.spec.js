'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');

describe('Response class', function() {
    it('should have a response container object', function() {
        expect(BadgeUp.response).to.be.an('object');
    });

    describe('BooleanResponse', function() {
        const BooleanResponse = BadgeUp.response.BooleanResponse;

        it('should have a BooleanResponse class', function() {
            expect(BooleanResponse).to.be.a('function');
        });

        it('should be able to create an instance of BooleanResponse', function() {
            const response = new BooleanResponse(true);
            expect(response).to.be.an('object');
        });

        it('should be able to convert the response to JSON', function() {
            const response = JSON.parse((JSON.stringify(new BooleanResponse(true))));
            expect(response).to.be.an('object');
            expect(response).to.eql({ type: 'BOOLEAN', complete: true });
        });
    });
});
