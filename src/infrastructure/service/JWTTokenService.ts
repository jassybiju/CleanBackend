import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { AuthPayload } from "@application/interfaces/AuthPayload";
import { ITokenService } from "@application/interfaces/ITokenService";

export class JwtTokenService implements ITokenService {
    private readonly accessTokenSecret: string = process.env.JWT_SECRET as string
  constructor(
    private readonly expiresIn: string = "15m"
  ) {}

  createAccessToken(userId: string): string {
    return jwt.sign(
      { userId },
      this.accessTokenSecret as Secret,
      { expiresIn: this.expiresIn } as SignOptions
    );
  }

  verifyAccessToken(token: string): AuthPayload {
    const payload = jwt.verify(token, this.accessTokenSecret) as AuthPayload;
    return payload;
  }
}
