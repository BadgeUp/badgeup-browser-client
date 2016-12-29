'use strict';

require('co-mocha');

const expect = require('chai').expect;
const BadgeUp = require('./../');
const bup = new BadgeUp({
    applicationId: '1337',
    apiKey: 'Co0kieMonst3r'
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
    it('should get a single event', function*() {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/events/${event.id}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.events.get(event.id, { _payload, _validate });

        expect(result).to.be.an('object');
    });

    it('should get all events', function*() {
        const event = generateFakeEvent();

        function _payload(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                // last page of date
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: null
                    },
                    data: (new Array(10)).fill(event)
                });
            } else {
                // first page of data
                return Promise.resolve({
                    pages: {
                        previous: null,
                        next: '/v1/apps/1337/events?after=PAGE_TWO'
                    },
                    data: (new Array(10)).fill(event)
                });
            }
        }

        function _validate(options) {
            if (options.url.indexOf('PAGE_TWO') > 0) {
                expect(options.url).to.equal('/v1/apps/1337/events?after=PAGE_TWO');
            } else {
                expect(options.url).to.equal('/v1/apps/1337/events');
            }
            expect(options.headers).to.be.an('object');
        }

        let count = 0;
        for (let event of bup.events.getAll({ _payload, _validate })) {
            count++;
            event = yield event;
            expect(event).to.be.an('object');
        }

        // total number of events
        expect(count).to.equal(20);
    });

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
});
