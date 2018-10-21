"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("./../src");
const bup = new src_1.BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});
describe('achievement icons', function () {
    it('should get all achievement icons', async function () {
        function _payload() {
            return Promise.resolve([{
                    url: 'url',
                    fileName: 'myIcon.png'
                }]);
        }
        function _validate(options) {
            chai_1.expect(options.method).to.equal('GET');
            chai_1.expect(options.url).to.equal('/v2/apps/1337/achievementicons');
        }
        const results = await bup.achievementIcons.getAll({ _payload, _validate });
        chai_1.expect(results.length).to.equal(1);
    });
    it('should delete an achievement icon', async function () {
        function _payload() {
            return Promise.resolve({
                url: 'url',
                fileName: 'myIcon.png'
            });
        }
        function _validate(options) {
            chai_1.expect(options.method).to.equal('DELETE');
            chai_1.expect(options.url).to.equal('/v2/apps/1337/achievementicons/myIcon.png');
        }
        await bup.achievementIcons.remove('myIcon.png', { _payload, _validate });
    });
});
//# sourceMappingURL=achievementIcons.spec.js.map