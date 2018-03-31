"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function collectQueryParams(source, keys) {
    return lodash_1.pickBy(source, function (value, key) {
        return !!value && keys.includes(key);
    });
}
exports.collectQueryParams = collectQueryParams;
//# sourceMappingURL=collectQueryParams.js.map