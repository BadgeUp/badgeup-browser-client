"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
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
    createV2Preview(object, userOpts) {
        // TODO: test how this works with user-provided headers, should be resolved by defaultsDeep
        userOpts = lodash_1.defaultsDeep(userOpts, { headers: { 'X-V2-PREVIEW': 'true' } });
        return this.common.create(object, userOpts);
    }
}
exports.EventsResource = EventsResource;
//# sourceMappingURL=index.js.map