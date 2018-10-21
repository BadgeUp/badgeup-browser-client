export interface Webhook {

    /**
     * A string that uniquely identifies this webhook.
     */
    id: string;

    /**
     * The application ID that this object belongs to.
     */
    applicationId: string;

    /**
     * A human-readable name.
     */
    name: string;

    /**
     * A human-readable description.
     */
    description: string;

    /**
     * URL to make a request to.
     */
    url: string;

    /**
     * Webhook request headers to send.
     */
    headers: { [key: string]: string };
}
