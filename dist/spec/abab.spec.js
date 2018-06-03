"use strict";
// tests the abab dependency
Object.defineProperty(exports, "__esModule", { value: true });
const abab_1 = require("abab");
const chai_1 = require("chai");
const fakeKey = 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ==';
describe('abab dependency', function () {
    it('should decode API key', async function () {
        const keyContents = JSON.parse(abab_1.atob(fakeKey));
        chai_1.expect(keyContents).to.eql({
            accountId: 'thebest',
            applicationId: '1337',
            key: 'icecreamandcookiesyum'
        });
    });
    it('should encode API key', async function () {
        const actual = abab_1.btoa(fakeKey + ':');
        const expected = 'ZXlKaFkyTnZkVzUwU1dRaU9pSjBhR1ZpWlhOMElpd2lZWEJ3YkdsallYUnBiMjVKWkNJNklqRXpNemNpTENKclpYa2lPaUpwWTJWamNtVmhiV0Z1WkdOdmIydHBaWE41ZFcwaWZRPT06';
        chai_1.expect(actual).to.equal(expected);
    });
});
//# sourceMappingURL=abab.spec.js.map