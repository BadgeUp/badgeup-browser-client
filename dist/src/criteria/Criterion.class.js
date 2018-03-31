"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ICriterionOperator;
(function (ICriterionOperator) {
    ICriterionOperator["greater"] = "@gt";
    ICriterionOperator["greaterOrEqual"] = "@gte";
    ICriterionOperator["less"] = "@lt";
    ICriterionOperator["lessOrEqual"] = "@lte";
    ICriterionOperator["equal"] = "@eq";
})(ICriterionOperator = exports.ICriterionOperator || (exports.ICriterionOperator = {}));
var CriterionType;
(function (CriterionType) {
    CriterionType["standard"] = "standard";
    CriterionType["timeseries"] = "timeseries";
})(CriterionType = exports.CriterionType || (exports.CriterionType = {}));
var ICriterionTimeseriesPeriodUnits;
(function (ICriterionTimeseriesPeriodUnits) {
    ICriterionTimeseriesPeriodUnits["minutes"] = "minutes";
    ICriterionTimeseriesPeriodUnits["hours"] = "hours";
    ICriterionTimeseriesPeriodUnits["days"] = "days";
    ICriterionTimeseriesPeriodUnits["weeks"] = "weeks";
})(ICriterionTimeseriesPeriodUnits = exports.ICriterionTimeseriesPeriodUnits || (exports.ICriterionTimeseriesPeriodUnits = {}));
//# sourceMappingURL=Criterion.class.js.map