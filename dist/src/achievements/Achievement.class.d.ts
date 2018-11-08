import { Condition } from '../progress/Progress.class';
import { Meta } from '../utils/Meta.class';
export interface AchievementRequest {
    name: string;
    description: string;
    evalTree?: EvalTreeGroup;
    options?: {
        suspended?: boolean;
        earnLimit?: number;
    };
    meta?: {
        icon: string;
        [x: string]: any;
    };
}
export interface Achievement extends AchievementRequest {
    id: string;
    applicationId: string;
    awards: string[];
    evalTree: EvalTreeGroup;
    meta: AchievementMeta;
}
export interface EvalTreeGroup {
    type: string;
    condition: Condition;
    groups: EvalTreeGroup[];
    criteria: string[];
}
export interface AchievementMeta extends Meta {
    icon: string;
}
