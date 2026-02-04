import { AuthPayload } from "./AuthPayload";

export interface ITokenService {
    createAccessToken(userId : string) : string,
    verifyAccessToken(token : string) : AuthPayload
}