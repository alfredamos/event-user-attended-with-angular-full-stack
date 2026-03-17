export class AuthParam {
    static readonly accessTokenName = "accessToken";
    static readonly refreshTokenName = "refreshToken";
    static readonly accessTokenPath = "/";
    static readonly refreshTokenPath = "/api/auth/refresh";
    static readonly accessTokenExpiresIn = 60 * 60 * 24;
    static readonly refreshTokenExpiresIn = 60 * 60 * 24 * 7;
}
