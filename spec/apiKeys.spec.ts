'use strict';

import { expect } from 'chai';
import { BadgeUp } from './../src';
const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

describe('API Keys', function() {
    it('should get a list of scopes', async function() {
        const payload = {
            data: [
                { scope: 'a', description: '' },
                { scope: 'b', description: '' }
            ]
        };

        function _payload() {
            return Promise.resolve(payload);
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/apikeys/scopes`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        const result = await bup.apiKeys.listScopes({ _payload, _validate });

        expect(result).to.be.an('array');
        expect(result).to.eql(payload.data);
    });
});
