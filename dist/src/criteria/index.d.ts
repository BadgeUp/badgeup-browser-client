import { Common } from '../common';
import { ResourceContext } from '../utils/ResourceContext';
import { Criterion } from './Criterion.class';
/**
 * Criteria resource
 * @param {ResourceContext} context The context to make requests as
 */
export declare class CriteriaResource extends Common<Criterion> {
    constructor(context: ResourceContext);
}
