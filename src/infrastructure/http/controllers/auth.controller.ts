import { CreateUserUseCase } from "@application/usecases/auth/CreateUserUseCase";
import { CurrentUserUseCase } from "@application/usecases/auth/CurrentUserUseCase";
import { LoginUserUseCase } from "@application/usecases/auth/LoginUserUseCase";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly currentUserUseCase: CurrentUserUseCase,
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result =await this.createUserUseCase.execute(
        req.body as { name: string; email: string; password: string },
      );

      res.status(200).json({ message: "User Created Successfully", result });
    } catch (error) {
      next(error);
    }
  }

  async login(req : Request, res : Response, next : NextFunction){
    try {
        const result = await this.loginUserUseCase.execute(req.body as {email : string, password : string})
        res.cookie( "jwt", result.accessToken).status(201).json({message : "User Logged in Successfully"})
    } catch (error) {
        next(error)
    }
  }

  async currentUser(req : Request, res : Response, next : NextFunction){
    try {
            const result = await this.currentUserUseCase.execute(req.cookies['jwt'])
            res.status(200).json({result})
    } catch (error) {
        next(error)
    }
  }
}
