import { AchievementIconsResource } from './achievementIcons';
import { AchievementsResource } from './achievements';
import { AnalyticsResource } from './analytics';
import { ApiKeysResource } from './apiKeys';
import { ApplicationsResource } from './applications';
import { AwardsResource } from './awards';
import { CriteriaResource } from './criteria';
import { EarnedAchievementsResource } from './earnedAchievements';
import { EventsResource } from './events';
import { BadgeUpHttp } from './http';
import { MetricsResource } from './metrics';
import { ProgressResource } from './progress';
import { ResourceContext } from './utils/ResourceContext';
export declare class BadgeUp implements ResourceContext {
    applicationId: string | null;
    http: BadgeUpHttp;
    applications: ApplicationsResource;
    achievements: AchievementsResource;
    analytics: AnalyticsResource;
    apiKeys: ApiKeysResource;
    awards: AwardsResource;
    criteria: CriteriaResource;
    earnedAchievements: EarnedAchievementsResource;
    metrics: MetricsResource;
    events: EventsResource;
    progress: ProgressResource;
    achievementIcons: AchievementIconsResource;
    /**
     * Construct an instance of the BadgeUp client.
     * @param {{apiKey: string, token: string, applicationId: string, request: object }} globalOpts - Client and global options
     */
    constructor(globalOpts: GlobalOptions);
}
export interface GlobalOptions {
    /**
     * API Key acquired from the BadgeUp Dashboard
     */
    apiKey?: string;
    /**
     * JWT token as an alternative method of authorization
     */
    token?: string;
    /**
     * Current application ID. Only needed if you provide a token.
     */
    applicationId?: string;
    /**
     * Additional HTTP request overrides
     */
    request?: {
        /**
         * request headers to override
         */
        headers?: {
            [key: string]: string;
        };
        /**
         * provide a different BadgeUp base URL
         */
        baseUrl?: string;
    };
}
export * from './achievementIcons/AchievementIcon.class';
export * from './achievements/Achievement.class';
export * from './apiKeys/ApiKey.class';
export * from './applications/Application.class';
export * from './awards/Award.class';
export * from './criteria/Criterion.class';
export * from './earnedAchievements/EarnedAchievement.class';
export * from './events/Event.class';
export * from './metrics/Metric.class';
export * from './progress/Progress.class';
export * from './utils/Meta.class';
export * from './utils/JsonPatch.class';
