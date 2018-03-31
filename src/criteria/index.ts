import { Common } from '../common';
import { ResourceContext } from '../utils/ResourceContext';
import { Criterion } from './Criterion.class';

const ENDPT = 'criteria';

/**
 * Criteria resource
 * @param {ResourceContext} context The context to make requests as
 */
export class CriteriaResource extends Common<Criterion> {
    constructor(context: ResourceContext) {
        super(context, ENDPT);
    }
}
