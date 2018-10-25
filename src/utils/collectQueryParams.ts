import pickBy from 'lodash.pickby';
import { QueryParameters } from './QueryBuilder';

export function collectQueryParams(source: QueryParameters, keys: string[]) {
    return pickBy(source, function(value, key) {
        return !!value && keys.includes(key);
    });
}
