import { Meta } from '../utils/Meta.class';
export interface EarnedAward {
    /**
     * A string that uniquely identifies this earned award.
     */
    id: string;
    /**
     * The application ID that this object belongs to.
     */
    applicationId: string;
    /**
     * A string that uniquely identifies the award that was earned.
     */
    awardId: string;
    /**
     * A string that uniquely identifies the achievement that gave the award that was earned.
     */
    achievementId: string;
    /**
     * A string that uniquely identifies the earned achievement record.
     */
    earnedAchievementId: string;
    /**
     * A string that uniquely identifies the subject that earned the award.
     */
    subject: string;
    /**
     * The state that the earned award is in. Some states only apply to certain award types.
     */
    state: 'created' | 'approved' | 'rejected' | 'redeemed';
    /**
     * Meta information object. Custom fields may be added.
     */
    meta: Meta;
}
