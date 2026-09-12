import * as oidc from "openid-client"
import OidcSession from "./OidcSession";

export interface OidcClientOptions {
    serverUrl: URL,
    clientId: string,
    clientSecret: string
}

export class OidcClient {
    public serverUrl : URL;
    public clientId: string;
    #clientSecret: string;

    constructor(options: OidcClientOptions) {
        this.serverUrl = options.serverUrl;
        this.clientId = options.clientId;
        this.#clientSecret = options.clientSecret;
    }

    async startSession(redirectUri: string) {
        const config = await oidc.discovery(
            this.serverUrl,
            this.clientId,
            undefined,
            oidc.ClientSecretBasic(this.#clientSecret)
        );
        return new OidcSession(config, redirectUri)
    }
}