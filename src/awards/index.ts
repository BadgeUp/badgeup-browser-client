import { Common } from '../common';
import { ResourceContext } from '../utils/ResourceContext';
import { Award } from './Award.class';

const ENDPT = 'awards';

/**
 * Awards resource
 * @param {ResourceContext} context The context to make requests as
 */
export class AwardsResource extends Common<Award> {
    constructor(context: ResourceContext) {
        super(context, ENDPT);
    }
}
