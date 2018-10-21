"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
const ENDPT = 'events';
/**
 * Events resource
 */
class EventsResource {
    /**
     * Construct the Events resource
     * @param context The context to make requests as
     */
    constructor(context) {
        this.common = new common_1.Common(context, ENDPT);
    }
    /**
     * Send an event to BadgeUp to be processed, returning achievement progress status
     * @param object Sub-resource to event to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided event
     */
    create(object, userOpts) {
        return this.common.create(object, userOpts);
    }
}
exports.EventsResource = EventsResource;
//# sourceMappingURL=index.js.map