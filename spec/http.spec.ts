import { expect } from 'chai';
import { BadgeUpHttp } from './../src/http';

describe('HTTP tests', function() {
    it('should not throw on a 200 status code', async function() {
        const h = new BadgeUpHttp({});

        const res = await h.makeRequest({
            method: 'POST',
            baseUrl: 'https://httpbin.org',
            url: '/post',
            body: { OK: true }
        }, {});

        expect(res).to.be.an('object');
    });

    it('should throw an error on a 400 status code', async function() {
        const h = new BadgeUpHttp({});

        try {
            await h.makeRequest({
                baseUrl: 'https://httpbin.org',
                url: '/status/400'
            }, {});
            expect.fail();
        } catch (error) {
            expect(error).to.be.an('error');
            expect(error.message).to.equal('BAD REQUEST');
        }
    });
});
