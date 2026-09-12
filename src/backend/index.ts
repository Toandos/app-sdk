import { OidcClientOptions, OidcClient } from "./oidc/OidcClient"

export {
    OidcClientOptions,
    OidcClient,
}

export interface AppBackendOptions {
    oidc: OidcClientOptions
}

export abstract class AppBackend {
    protected readonly oidcClient: OidcClient

    constructor(options: AppBackendOptions) {
        this.oidcClient = new OidcClient(options.oidc)
    }
}