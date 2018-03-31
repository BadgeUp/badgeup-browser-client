export declare class BadgeUpHttp {
    globalReqOpts: any;
    /**
     * Constructor for the HTTP stack for BadgeUp
     * @param globalReqOpts Options from the user for BadgeUp as a whole.
     */
    constructor(globalReqOpts: any);
    /**
     * Performs a HTTP request given the collective options
     * @param reqOpts Request options from this library's functions.
     * @param userOpts Option overrides from the user. Highest priority.
     * @return Returns a Promise that resolves with the request data
     */
    makeRequest(reqOpts: any, userOpts: any): Promise<any>;
}
