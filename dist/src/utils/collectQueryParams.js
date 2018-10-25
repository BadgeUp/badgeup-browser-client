"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_pickby_1 = __importDefault(require("lodash.pickby"));
function collectQueryParams(source, keys) {
    return lodash_pickby_1.default(source, function (value, key) {
        return !!value && keys.includes(key);
    });
}
exports.collectQueryParams = collectQueryParams;
//# sourceMappingURL=collectQueryParams.js.map