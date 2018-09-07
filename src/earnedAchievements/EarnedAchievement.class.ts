import { Meta } from '../utils/Meta.class';

export interface EarnedAchievement {
    /**
     * A string that uniquely identifies this earned achievement.
     */
    id: string;

    /**
     * The application ID that this object belongs to.
     */
    applicationId: string;

    /**
     * A string that uniquely identifies the achievement this is a record for.
     */
    achievementId: string;

    /**
     * A string that uniquely identifies the subject that earned the achievement.
     */
    subject: string;

    /**
     * Meta information object. Custom fields may be added.
     */
    meta: Meta;
}
