"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEFAULT_EVENT_MODIFIER = { '@inc': 1 };
class EventRequest {
    constructor(subject, key, modifier = DEFAULT_EVENT_MODIFIER, options) {
        /**
         * Uniquely identifies the subject the event is for.
         */
        this.subject = '';
        this.subject = subject;
        this.key = key;
        this.modifier = modifier;
        this.options = options;
    }
    /**
     * Retrieves the event's modifier key
     */
    get modifierKey() {
        return Object.keys(this.modifier)[0];
    }
    /**
     * Retrieves the event's modifier value
     */
    get modifierValue() {
        return this.modifier[this.modifierKey];
    }
    /**
     * States if this event is set to be discarded (not persisted long-term)
     */
    get discard() {
        return !!(this.options && this.options.discard === true);
    }
}
exports.EventRequest = EventRequest;
/**
 * BadgeUp Event response
 */
class Event extends EventRequest {
    constructor(id, applicationId, subject, key, modifier = DEFAULT_EVENT_MODIFIER, options) {
        super(subject, key, modifier, options);
        this.id = id;
        this.applicationId = applicationId;
    }
    static fromSource(source) {
        return new Event(source.id, source.applicationId, source.subject, source.key, source.modifier, source.options);
    }
}
exports.Event = Event;
//# sourceMappingURL=Event.class.js.map