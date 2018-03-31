import { BadgeUpHttp } from '../http';

export interface ResourceContext {
    applicationId: string | null;
    http: BadgeUpHttp;
}
