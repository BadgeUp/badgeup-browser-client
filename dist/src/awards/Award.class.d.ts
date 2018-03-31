import { Meta } from '../utils/Meta.class';
export interface Award {
    /**
     * A string that uniquely identifies this award.
     */
    id: string;
    /**
     * The application ID that this object belongs to.
     */
    applicationId: string;
    /**
     * 	A short, human-readable name.
     */
    name: string;
    /**
     * A human-readable description.
     */
    description: string;
    /**
     * Arbitrary data defining the award. You should populate this with data your application can use to identify what action to perform.
     */
    data: any;
    /**
     * Meta information object. Custom fields may be added.
     */
    meta: Meta;
}
