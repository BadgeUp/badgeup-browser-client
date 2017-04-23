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
    it('should get a single event', function*() {
        const event = generateFakeEvent();
        function _payload() {
            return {
                pages: {
                    previous: null,
                    next: null
                },
                data: [event]
            };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/events?id=${event.id}`);
            expect(options.method).to.be.oneOf([undefined, 'GET']);
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.events.query().id(event.id).getAll({ _payload, _validate });

        expect(result).to.be.an('array');
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
                expect(options.url).to.equal('/v1/apps/1337/events?');
            }
            expect(options.headers).to.be.an('object');
        }

        let count = 0;
        for (let event of bup.events.query().getIterator({ _payload, _validate })) {
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

    it('should delete an event', function*() {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/events?id=${event.id}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        const result = yield bup.events.query().id(event.id).remove({ _payload, _validate });

        expect(result).to.eql(event);
    });

    it('should delete multiple events for a subject', function*() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/events?subject=100`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        yield bup.events.query().subject('100').remove({ _payload, _validate });
    });

    it('should delete multiple events after a specific date', function*() {
        const date = new Date();

        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/events?since=${date.toISOString().replace(/:/g, '%3A')}`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        yield bup.events.query().since(date).remove({ _payload, _validate });
    });

    it('should delete all events', function*() {
        function _payload() {
            return { count: 5 };
        }

        function _validate(options) {
            expect(options.url).to.equal(`/v1/apps/1337/events?all=true`);
            expect(options.method).to.equal('DELETE');
            expect(options.headers).to.be.an('object');
        }

        yield bup.events.query().all(true).remove({ _payload, _validate });
    });
});
