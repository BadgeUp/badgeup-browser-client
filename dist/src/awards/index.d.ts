import { Common } from '../common';
import { ResourceContext } from '../utils/ResourceContext';
import { Award } from './Award.class';
/**
 * Awards resource
 * @param {ResourceContext} context The context to make requests as
 */
export declare class AwardsResource extends Common<Award> {
    constructor(context: ResourceContext);
}
