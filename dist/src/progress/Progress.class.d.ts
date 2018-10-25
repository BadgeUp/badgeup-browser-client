import { Achievement } from '../achievements/Achievement.class';
export interface BaseProgress {
    /**
     * States if the achievement has been earned.
     */
    isComplete: boolean;
    /**
     * Overall completion of the achievement represented as a percentage. A value of 1 indicates that the achievement is 100% complete.
     */
    percentComplete: number;
    /**
     * An object that defines the evaluation logic of associated criteria.
     */
    progressTree: ProgressTreeGroup;
    /**
     * A string that uniquely identifies this achievement.
     */
    achievementId: string;
    /**
     * A string that uniquely identifies this most recently earned achievement.
     */
    earnedAchievementId: string;
}
export interface Progress extends BaseProgress {
    /**
     * Included achievement document information.
     */
    achievement?: Achievement;
}
export interface ProgressTreeGroup {
    criteria: {
        [key: string]: number;
    };
    type: string;
    condition: Condition;
    groups: ProgressTreeGroup[];
}
export declare enum Condition {
    and = "AND",
    or = "OR"
}
