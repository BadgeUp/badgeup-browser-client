// tests the abab dependency

import { atob, btoa } from 'abab';
import { expect } from 'chai';

const fakeKey = 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ==';

describe('abab dependency', function() {
    it('should decode API key', async function() {
        const keyContents = JSON.parse(atob(fakeKey));
        expect(keyContents).to.eql({
            accountId: 'thebest',
            applicationId: '1337',
            key: 'icecreamandcookiesyum'
        });
    });

    it('should encode API key', async function() {
        const actual = btoa(fakeKey + ':');
        const expected = 'ZXlKaFkyTnZkVzUwU1dRaU9pSjBhR1ZpWlhOMElpd2lZWEJ3YkdsallYUnBiMjVKWkNJNklqRXpNemNpTENKclpYa2lPaUpwWTJWamNtVmhiV0Z1WkdOdmIydHBaWE41ZFcwaWZRPT06';
        expect(actual).to.equal(expected);
    });
});
