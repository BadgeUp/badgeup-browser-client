import { atob, btoa } from 'abab';
import * as check from 'check-types';
import defaultsDeep from 'lodash.defaultsdeep';
import { AchievementIconsResource } from './achievementIcons';
import { AchievementsResource } from './achievements';
import { AnalyticsResource } from './analytics';
import { ApiKeysResource } from './apiKeys';
import { ApplicationsResource } from './applications';
import { AwardsResource } from './awards';
import { CriteriaResource } from './criteria';
import { EarnedAchievementsResource } from './earnedAchievements';
import { EarnedAwardsResource } from './earnedAwards';
import { EventsResource } from './events';
import { BadgeUpHttp } from './http';
import { MetricsResource } from './metrics';
import { ProgressResource } from './progress';
import { ResourceContext } from './utils/ResourceContext';
import { WebhooksResource } from './webhooks';

export class BadgeUp implements ResourceContext {

    applicationId: string | null = null;

    // http client
    http: BadgeUpHttp;

    // resources
    public applications: ApplicationsResource;
    public achievements: AchievementsResource;
    public analytics: AnalyticsResource;
    public apiKeys: ApiKeysResource;
    public awards: AwardsResource;
    public criteria: CriteriaResource;
    public earnedAchievements: EarnedAchievementsResource;
    public metrics: MetricsResource;
    public events: EventsResource;
    public progress: ProgressResource;
    public earnedAwards: EarnedAwardsResource;
    public achievementIcons: AchievementIconsResource;
    public webhooks: WebhooksResource;

    /**
     * Construct an instance of the BadgeUp client.
     * @param {{apiKey: string, token: string, applicationId: string, request: object }} globalOpts - Client and global options
     */
    constructor(globalOpts: GlobalOptions) {

        // these fields are required
        check.assert.object(globalOpts, 'You must provide an options object. Please see the documentation.');
        if (!globalOpts.apiKey && !globalOpts.token) {
            throw new Error('Either globalOpts.apiKey or globalOpts.token must be a string');
        }

        // ensure the request options are an object if not defined
        globalOpts.request = defaultsDeep({}, globalOpts.request);
        globalOpts.request!.headers = defaultsDeep({}, globalOpts.request!.headers);

        // setup the Authorization header
        if (globalOpts.token) { // JWT bearer token
            check.assert.string(globalOpts.applicationId, 'You must provide your applicationId.');
            // setup the application this client is pointing to
            this.applicationId = globalOpts.applicationId!;
            globalOpts.request!.headers!.authorization = 'Bearer ' + globalOpts.token;
        } else if (globalOpts.apiKey) { // BadgeUp APIKey
            let applicationId;

            try {
                applicationId = JSON.parse(atob(globalOpts.apiKey)).applicationId;
                if (!applicationId) {
                    throw new Error('applicationId not present');
                }
                this.applicationId = applicationId;
            } catch (error) {
                // TODO: test this
                if (error.message !== 'applicationId not present') {
                    throw new Error('Malformed API key');
                } else {
                    throw error;
                }
            }

            globalOpts.request!.headers!.authorization = 'Basic ' + btoa(globalOpts.apiKey + ':');
        }

        this.http = new BadgeUpHttp(globalOpts.request);

        this.applications = new ApplicationsResource(this);
        this.achievements = new AchievementsResource(this);
        this.analytics = new AnalyticsResource(this);
        this.apiKeys = new ApiKeysResource(this);
        this.awards = new AwardsResource(this);
        this.criteria = new CriteriaResource(this);
        this.earnedAchievements = new EarnedAchievementsResource(this);
        this.metrics = new MetricsResource(this);
        this.events = new EventsResource(this);
        this.progress = new ProgressResource(this);
        this.achievementIcons = new AchievementIconsResource(this);
        this.earnedAwards = new EarnedAwardsResource(this);
        this.webhooks = new WebhooksResource(this);
    }
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
            [key: string]: string
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
export * from './earnedAwards/EarnedAward.class';
export * from './events/Event.class';
export * from './metrics/Metric.class';
export * from './progress/Progress.class';
export * from './webhooks/Webhook.class';
export * from './utils/Meta.class';
export * from './utils/JsonPatch.class';
