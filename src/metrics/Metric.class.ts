export interface Metric extends MetricRequest {
    /**
     * A string that uniquely identifies this metric.
     */
    id: string;

    /**
     * The application ID that this object belongs to.
     */
    applicationId: string;
}

export interface MetricRequest {
    /**
     * States what the metric represents, such as a player action or other occurrence. You may want to create your keys in groups, e.g. "player:jump".
     */
    key: string;
    /**
     * Identifies the subject this metric is for. This would commonly be a unique user identifier.
     */
    subject: string;
    /**
     * Value of this metric.
     */
    value: number;
}
