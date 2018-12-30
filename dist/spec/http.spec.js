"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const http_1 = require("./../src/http");
describe('HTTP tests', function () {
    it('should not throw on a 200 status code', async function () {
        const h = new http_1.BadgeUpHttp({});
        const res = await h.makeRequest({
            method: 'POST',
            baseUrl: 'https://httpbin.org',
            url: '/post',
            body: { OK: true }
        }, {});
        chai_1.expect(res).to.be.an('object');
    });
    it('should throw an error on a 400 status code', async function () {
        const h = new http_1.BadgeUpHttp({});
        try {
            await h.makeRequest({
                baseUrl: 'https://httpbin.org',
                url: '/status/400'
            }, {});
            chai_1.expect.fail();
        }
        catch (error) {
            chai_1.expect(error).to.be.an('error');
            chai_1.expect(error.message).to.equal('BAD REQUEST');
        }
    });
});
//# sourceMappingURL=http.spec.js.map