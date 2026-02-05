import { JwtTokenService } from "@infrastructure/service/JWTTokenService";
import {Request, Response,  NextFunction } from "express";

const tokenService = new JwtTokenService()

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jwt = req.cookies['jwt'];

  if (!jwt) {
    return res.status(401).json({ message: "Missing Authorization header" });
  }

  console.log(jwt)
  if (!jwt) {
    return res.status(401).json({ message: "Invalid Authorization format" });
  }

  try {
    const payload = tokenService.verifyAccessToken(jwt);
    console.log(payload)
    req.userId =  payload.userId as string;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
