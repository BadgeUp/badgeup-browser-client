"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("./../src");
const Event_class_1 = require("./../src/events/Event.class");
const bup = new src_1.BadgeUp({
    apiKey: 'eyJhY2NvdW50SWQiOiJ0aGViZXN0IiwiYXBwbGljYXRpb25JZCI6IjEzMzciLCJrZXkiOiJpY2VjcmVhbWFuZGNvb2tpZXN5dW0ifQ=='
});
function generateFakeEvent() {
    const e = new Event_class_1.Event(Math.floor(Math.random() * 1e6) + '', 'appId', 'kram', 'event:key');
    e.modifier = { '@inc': 5 };
    e.timestamp = new Date();
    return e;
}
describe('events', function () {
    it('should create an event', async function () {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }
        function _validate(options) {
            chai_1.expect(options.url).to.equal('/v1/apps/1337/events');
            chai_1.expect(options.method).to.equal('POST');
            chai_1.expect(options.headers).to.be.an('object');
        }
        const result = await bup.events.create(event, { _payload, _validate });
        chai_1.expect(result).to.eql(event);
    });
    it('should create an event with the showIncomplete query parameter', async function () {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }
        function _validate(options) {
            chai_1.expect(options.url).to.equal('/v1/apps/1337/events?showIncomplete=true');
            chai_1.expect(options.method).to.equal('POST');
            chai_1.expect(options.headers).to.be.an('object');
        }
        const query = { showIncomplete: true };
        const result = await bup.events.create(event, { query, _payload, _validate });
        chai_1.expect(result).to.eql(event);
    });
    it('should create an event', function* () {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }
        function _validate(options) {
            chai_1.expect(options.url).to.equal('/v1/apps/1337/events');
            chai_1.expect(options.method).to.equal('POST');
            chai_1.expect(options.headers).to.be.an('object');
            chai_1.expect(options.headers['X-V2-PREVIEW']).to.equal(true);
        }
        const result = yield bup.events.createV2Preview(event, { _payload, _validate });
        chai_1.expect(result).to.eql(event);
    });
    it('should create an event with the showIncomplete query parameter', function* () {
        const event = generateFakeEvent();
        function _payload() {
            return event;
        }
        function _validate(options) {
            chai_1.expect(options.url).to.equal('/v1/apps/1337/events?showIncomplete=true');
            chai_1.expect(options.method).to.equal('POST');
            chai_1.expect(options.headers).to.be.an('object');
            chai_1.expect(options.headers['X-V2-PREVIEW']).to.equal(true);
        }
        const query = { showIncomplete: true };
        const result = yield bup.events.createV2Preview(event, { query, _payload, _validate });
        chai_1.expect(result).to.eql(event);
    });
});
//# sourceMappingURL=events.spec.js.map