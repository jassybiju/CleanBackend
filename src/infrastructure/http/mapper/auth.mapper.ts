import { CreateCommentUseCase } from "@application/usecases/comment/CreateCommentUseCase";
import { AuthController } from "../controllers/auth.controller";
import { UserMongoRepository } from "@infrastructure/db/repositories/UserMongoRepository";
import { CreateUserUseCase } from "@application/usecases/auth/CreateUserUseCase";



const userRepo = new UserMongoRepository()

const createUserUseCase = new CreateUserUseCase(userRepo)
const authController = new AuthController()