import { ResourceContext } from '../utils/ResourceContext';
import { EventRequest, EventV1, EventV2Preview } from './Event.class';
/**
 * Events resource
 */
export declare class EventsResource {
    private common;
    /**
     * Construct the Events resource
     * @param context The context to make requests as
     */
    constructor(context: ResourceContext);
    /**
     * Send an event to BadgeUp to be processed, returning achievement progress status
     * @param object Sub-resource to event to create
     * @param userOpts option overrides for this request
     * @returns A promise that resolves to the provided event
     */
    create(object: EventRequest, userOpts?: any): Promise<EventV1>;
    createV2Preview(object: EventRequest, userOpts?: any): Promise<EventV2Preview>;
}
