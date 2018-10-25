"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abab_1 = require("abab");
const check = __importStar(require("check-types"));
const lodash_defaultsdeep_1 = __importDefault(require("lodash.defaultsdeep"));
const achievementIcons_1 = require("./achievementIcons");
const achievements_1 = require("./achievements");
const analytics_1 = require("./analytics");
const apiKeys_1 = require("./apiKeys");
const applications_1 = require("./applications");
const awards_1 = require("./awards");
const criteria_1 = require("./criteria");
const earnedAchievements_1 = require("./earnedAchievements");
const earnedAwards_1 = require("./earnedAwards");
const events_1 = require("./events");
const http_1 = require("./http");
const metrics_1 = require("./metrics");
const progress_1 = require("./progress");
const webhooks_1 = require("./webhooks");
class BadgeUp {
    /**
     * Construct an instance of the BadgeUp client.
     * @param {{apiKey: string, token: string, applicationId: string, request: object }} globalOpts - Client and global options
     */
    constructor(globalOpts) {
        this.applicationId = null;
        // these fields are required
        check.assert.object(globalOpts, 'You must provide an options object. Please see the documentation.');
        if (!globalOpts.apiKey && !globalOpts.token) {
            throw new Error('Either globalOpts.apiKey or globalOpts.token must be a string');
        }
        // ensure the request options are an object if not defined
        globalOpts.request = lodash_defaultsdeep_1.default({}, globalOpts.request);
        globalOpts.request.headers = lodash_defaultsdeep_1.default({}, globalOpts.request.headers);
        // setup the Authorization header
        if (globalOpts.token) { // JWT bearer token
            check.assert.string(globalOpts.applicationId, 'You must provide your applicationId.');
            // setup the application this client is pointing to
            this.applicationId = globalOpts.applicationId;
            globalOpts.request.headers.authorization = 'Bearer ' + globalOpts.token;
        }
        else if (globalOpts.apiKey) { // BadgeUp APIKey
            let applicationId;
            try {
                applicationId = JSON.parse(abab_1.atob(globalOpts.apiKey)).applicationId;
                if (!applicationId) {
                    throw new Error('applicationId not present');
                }
                this.applicationId = applicationId;
            }
            catch (error) {
                // TODO: test this
                if (error.message !== 'applicationId not present') {
                    throw new Error('Malformed API key');
                }
                else {
                    throw error;
                }
            }
            globalOpts.request.headers.authorization = 'Basic ' + abab_1.btoa(globalOpts.apiKey + ':');
        }
        this.http = new http_1.BadgeUpHttp(globalOpts.request);
        this.applications = new applications_1.ApplicationsResource(this);
        this.achievements = new achievements_1.AchievementsResource(this);
        this.analytics = new analytics_1.AnalyticsResource(this);
        this.apiKeys = new apiKeys_1.ApiKeysResource(this);
        this.awards = new awards_1.AwardsResource(this);
        this.criteria = new criteria_1.CriteriaResource(this);
        this.earnedAchievements = new earnedAchievements_1.EarnedAchievementsResource(this);
        this.metrics = new metrics_1.MetricsResource(this);
        this.events = new events_1.EventsResource(this);
        this.progress = new progress_1.ProgressResource(this);
        this.achievementIcons = new achievementIcons_1.AchievementIconsResource(this);
        this.earnedAwards = new earnedAwards_1.EarnedAwardsResource(this);
        this.webhooks = new webhooks_1.WebhooksResource(this);
    }
}
exports.BadgeUp = BadgeUp;
__export(require("./criteria/Criterion.class"));
__export(require("./events/Event.class"));
__export(require("./progress/Progress.class"));
__export(require("./utils/JsonPatch.class"));
//# sourceMappingURL=index.js.map