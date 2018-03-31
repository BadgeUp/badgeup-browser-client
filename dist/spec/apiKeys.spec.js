'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("./../src");
const bup = new src_1.BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});
describe('API Keys', function () {
    it('should get a list of scopes', async function () {
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
            chai_1.expect(options.url).to.equal(`/v1/apps/1337/apikeys/scopes`);
            chai_1.expect(options.method).to.be.oneOf([undefined, 'GET']);
            chai_1.expect(options.headers).to.be.an('object');
        }
        const result = await bup.apiKeys.listScopes({ _payload, _validate });
        chai_1.expect(result).to.be.an('array');
        chai_1.expect(result).to.eql(payload.data);
    });
});
//# sourceMappingURL=apiKeys.spec.js.map