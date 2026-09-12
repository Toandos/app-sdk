import * as oidc from "openid-client"

class OidcSession {
    constructor(
        public config: oidc.Configuration,
        public redirectUri: string
    ) { }

    #state: string = oidc.randomState();
    get authorizationUrl() {
        return oidc.buildAuthorizationUrl(this.config, {
            scope: "openid email profile",
            state: this.#state,
            redirect_uri: this.redirectUri
        })
    }

    #tokens: oidc.TokenEndpointResponse & oidc.TokenEndpointResponseHelpers | null = null;
    async authorizationCodeGrant(request: Request) {
        this.#tokens = await oidc.authorizationCodeGrant(this.config, request, {
            expectedState: this.#state
        })
        this.#state = oidc.randomState();
    }

    async fetchUserInfo() {
        if(this.#tokens == null)
            throw new Error("No tokens obtained yet")
        return await oidc.fetchUserInfo(this.config, this.#tokens.access_token, this.#tokens.claims()!.sub)
    }
}
export default OidcSession;