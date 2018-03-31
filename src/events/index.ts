import { defaultsDeep } from 'lodash';
import { Common } from '../common';
import { ResourceContext } from '../utils/ResourceContext';
import { EventRequest, EventV1, EventV2Preview } from './Event.class';

const ENDPT = 'events';

/**
 * Events resource
 */
export class EventsResource {
    private common: Common<EventV1>;

    /**
     * Construct the Events resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext) {
        this.common = new Common(context, ENDPT);
    }

    /**
     * Send an event to BadgeUp to be processed, returning achievement progress status
     * @param object Sub-resource to event to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided event
     */
    public create(object: EventRequest, userOpts?): Promise<EventV1> {
        return this.common.create(object, userOpts);
    }

    public createV2Preview(object: EventRequest, userOpts?): Promise<EventV2Preview> {
        // TODO: test how this works with user-provided headers, should be resolved by defaultsDeep
        userOpts = defaultsDeep(userOpts, { headers: { 'X-V2-PREVIEW': 'true' } });
        return this.common.create<EventV2Preview>(object, userOpts);
    }

}
