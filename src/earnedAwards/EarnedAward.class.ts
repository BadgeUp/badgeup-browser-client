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
     * A string that uniquely identifies the award this is a record for.
     */
    awardId: string;

    /**
     * A string that uniquely identifies the achievement this is a record for.
     */
    achievementId: string;

    /**
     * A string that uniquely identifies the achievement this is a record for.
     */
    earnedAchievementId: string;

    /**
     * A string that uniquely identifies the subject that earned the award.
     */
    subject: string;

    /**
     * The state that the earned award is in. Some states only apply to certain award types.
     */
    state: 'CREATED' | 'APPROVED' | 'REJECTED' | 'REDEEMED';

    /**
     * Meta information object. Custom fields may be added.
     */
    meta: Meta;
}
