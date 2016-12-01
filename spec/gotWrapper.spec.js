require('co-mocha');

const expect = require('chai').expect;
const got = require('./../src/utils/gotWrapper.js');

describe('got wrapper', function() {
    it('should be able to GET a JSON payload', function*() {
        const response = yield got({
            json: true,
            timeout: 5000,
            baseUrl: 'https://httpbin.org',
            url: '/get',
            method: 'GET',
            headers: {
                'User-Agent': 'badgeup-node-client/ci (https://github.com/BadgeUp/badgeup-node-client)',
                'Accept': 'application/json'
            }
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body.headers['Accept']).to.equal('application/json');
        expect(response.body.headers['User-Agent']).to.contain('badgeup');
    });

    it('should be able to POST a JSON payload', function*() {
        const payload = {
            arbitrary: 'string',
            isJSON: true
        };

        const response = yield got({
            json: true,
            timeout: 5000,
            baseUrl: 'https://httpbin.org',
            url: '/post',
            method: 'POST',
            body: payload,
            headers: {
                'User-Agent': 'badgeup-node-client/ci (https://github.com/BadgeUp/badgeup-node-client)',
                'Accept': 'application/json'
            }
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('object');
        expect(response.body.headers['Accept']).to.equal('application/json');
        expect(response.body.headers['Content-Type']).to.equal('application/json');
        expect(response.body.headers['User-Agent']).to.contain('badgeup');
        expect(response.body.headers['User-Agent']).to.contain('badgeup');
        expect(response.body.json).to.deep.equal(payload);
    });

    it('should handle gzip-encoded data', function*() {
        const payload = {
            arbitrary: 'string',
            isJSON: true
        };

        const response = yield got({
            json: true,
            timeout: 5000,
            baseUrl: 'https://httpbin.org',
            url: '/gzip',
            method: 'GET',
            body: payload,
            headers: {
                'User-Agent': 'badgeup-node-client/ci (https://github.com/BadgeUp/badgeup-node-client)',
                'Accept': 'application/json'
            }
        });

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.be.an('object');
    });
});
