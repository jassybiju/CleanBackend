import { CreateCommentUseCase } from "@application/usecases/comment/CreateCommentUseCase";
import { AuthController } from "../controllers/auth.controller";
import { UserMongoRepository } from "@infrastructure/db/repositories/mongo/UserMongoRepository";
import { CreateUserUseCase } from "@application/usecases/auth/CreateUserUseCase";
import { UUIDGenerator } from "@infrastructure/service/UUIDGenerator";
import { BcryptPasswordService } from "@infrastructure/service/BcryptPasswordService";
import { LoginUserUseCase } from "@application/usecases/auth/LoginUserUseCase";
import { JwtTokenService } from "@infrastructure/service/JWTTokenService";
import { CurrentUserUseCase } from "@application/usecases/auth/CurrentUserUseCase";
import { UserMySQLRepository } from "@infrastructure/db/repositories/mysql/UserMySQLRepository";
import { UserDualRepository } from "@infrastructure/db/repositories/dualDB/UserDualDBRepository";

const userRepo = new UserDualRepository(new UserMySQLRepository(), new UserMongoRepository())

const idGenerator = new UUIDGenerator()
const bcryptPasswordService = new BcryptPasswordService()
const jwtTokenService = new JwtTokenService()



const createUserUseCase = new CreateUserUseCase(idGenerator,bcryptPasswordService,userRepo);
const loginUserUseCase = new LoginUserUseCase(userRepo, bcryptPasswordService,jwtTokenService)
const currentUserUseCase = new CurrentUserUseCase(jwtTokenService,userRepo)

export const authController = new AuthController(createUserUseCase,loginUserUseCase,currentUserUseCase);
