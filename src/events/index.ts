import { Common } from '../common';
import { ResourceContext } from '../utils/ResourceContext';
import { Event, EventRequest, EventResults } from './Event.class';

const ENDPT = 'events';

/**
 * Events resource
 */
export class EventsResource {
    private common: Common<Event>;

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
    public create(object: EventRequest, userOpts?): Promise<EventResults> {
        return this.common.create<EventResults>(object, userOpts);
    }
}
