'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    applicationId: '1337',
    apiKey: 'Co0kieMonst3r'
});

describe('API Keys', function() {
    it('should get a list of scopes', function*() {
        const payload = {
            data: [
                { scope: 'a', description: '' },
                { scope: 'b', description: '' }
            ]
        };

        function _payload() {
            return payload;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/apikeys/scopes`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.apiKeys.listScopes({ _payload, _validate });

        expect(result).to.be.an('object');
        expect(result).to.eql(payload);
    });
});
