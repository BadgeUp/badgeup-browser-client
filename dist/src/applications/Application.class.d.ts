import { Meta } from '../utils/Meta.class';
export interface BadgeUpApplicationRequest {
    /**
     * A short, human-readable name.
     */
    name: string;
    /**
     * A human-readable description.
     */
    description: string;
    /**
     * Meta information object. Custom fields may be added.
     */
    meta?: Meta;
}
export interface BadgeUpApplication extends BadgeUpApplicationRequest {
    /**
     * A string that uniquely identifies this application.
     */
    id: string;
    /**
     * A string that uniquely identifies this account.
     */
    accountId: string;
    /**
     * Meta information object. Custom fields may be added.
     */
    meta: BadgeUpApplicationMeta;
}
export interface BadgeUpApplicationMeta extends Meta {
    demo?: boolean;
}
