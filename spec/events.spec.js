'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});

function generateFakeEvent() {
    return {
        id: Math.floor(Math.random() * 1e6),
        subject: 'kram',
        key: 'event:key',
        modifier: { '@inc': 5 },
        timestamp: Date.now(),
        options: null,
        data: null
    };
}

describe('events', function() {
    it('should create an event', function*() {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }

        function _validate(options) {
            expect(options.url).to.equal('/v1/apps/1337/events');
            expect(options.method).to.equal('POST');
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.events.create(event, { _payload, _validate });

        expect(result).to.eql(event);
    });

    it('should create an event with the showIncomplete query parameter', function*() {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }

        function _validate(options) {
            expect(options.url).to.equal('/v1/apps/1337/events?showIncomplete=true');
            expect(options.method).to.equal('POST');
            expect(options.headers).to.be.an('object');
        }

        const query = { showIncomplete: true };
        const result = yield bup.events.create(event, { query, _payload, _validate });

        expect(result).to.eql(event);
    });
});
