import { Achievement } from '../achievements/Achievement.class';

export interface Progress {
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
     * The root achievement document.
     */
    achievement: Achievement;
    /**
     * A string that uniquely identifies this most recently earned achievement.
     */
    earnedAchievementId: string;
}

export interface ProgressTreeGroup {
    criteria: {[key: string]: number};
    type: string;
    condition: Condition
    groups: ProgressTreeGroup[]
}

export enum Condition {
    and = 'AND',
    or = 'OR'
}
