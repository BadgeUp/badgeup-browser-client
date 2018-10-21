import { Meta } from '../utils/Meta.class';
export interface Criterion {
    id: string;
    applicationId: string;
    key: string;
    name: string;
    description: string;
    meta: Meta;
    evaluation: CriterionEvaluation;
}
export interface CriterionEvaluation {
    /**
     * The criterion evaluation type. Must be one of "standard", "timeseries".
     */
    type: CriterionType;
    /**
     * Defines how the threshold field and metric value should be compared.
     */
    operator: ICriterionOperator;
    /**
     * Threshold that will be compared against a metric value.
     */
    threshold: number;
    /**
     * Criteria repetition options.
     * Standard criteria only.
     */
    repeatOptions?: {
        /**
         * Defines if metrics above the threshold should be counted towards the next achievement.
         */
        carryOver: boolean;
    };
    /**
     * The time period during which metrics will be used for evaluation.
     * Timeseries criteria only.
     */
    period?: {
        /**
         * The number of time units to consider.
         */
        value: number;
        /**
         * The time unit.
         */
        unit: ICriterionTimeseriesPeriodUnits;
    };
    /**
     * The number of time periods for which the metric threshold must be met in order for the criterion to be complete.
     * Timeseries criteria only.
     */
    multiplicity?: {
        /**
         * Number of periods to lookback. Only used if consecutive is false
         */
        lookback: number;
        /**
         * The number of periods for which the metric threshold must be met.
         */
        periods: number;
        /**
         * Whether the time periods must be consecutive. Only has an effect if value is greater than 1.
         */
        consecutive: boolean;
    };
}
export declare enum ICriterionOperator {
    greater = "@gt",
    greaterOrEqual = "@gte",
    less = "@lt",
    lessOrEqual = "@lte",
    equal = "@eq"
}
export declare enum CriterionType {
    standard = "standard",
    timeseries = "timeseries"
}
export declare enum ICriterionTimeseriesPeriodUnits {
    minutes = "minutes",
    hours = "hours",
    days = "days",
    weeks = "weeks"
}
