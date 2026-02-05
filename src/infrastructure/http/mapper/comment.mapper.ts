import { PostMongoRepository } from "@infrastructure/db/repositories/mongo/PostMongoRepository";
import { CommentController } from "../controllers/comment.controller";
import { UserMongoRepository } from "@infrastructure/db/repositories/mongo/UserMongoRepository";
import { UUIDGenerator } from "@infrastructure/service/UUIDGenerator";
import { BcryptPasswordService } from "@infrastructure/service/BcryptPasswordService";
import { JwtTokenService } from "@infrastructure/service/JWTTokenService";
import { CommentMongoRepository } from "@infrastructure/db/repositories/mongo/CommentMongoRepository";
import { CreateCommentUseCase } from "@application/usecases/comment/CreateCommentUseCase";
import { DeleteCommentUseCase } from "@application/usecases/comment/DeleteCommentUseCase";
import { PostMySQLRepository } from "@infrastructure/db/repositories/mysql/PostMySQLRepository";
import { UserMySQLRepository } from "@infrastructure/db/repositories/mysql/UserMySQLRepository";
import { CommentMySQLRepository } from "@infrastructure/db/repositories/mysql/CommentMySQLRepository";
import { PostDualRepository } from "@infrastructure/db/repositories/dualDB/PostDualDBRepository";
import { UserDualRepository } from "@infrastructure/db/repositories/dualDB/UserDualDBRepository";
import { CommentDualRepository } from "@infrastructure/db/repositories/dualDB/CommentDualDBRepository";


const postRepo = new PostDualRepository(new PostMySQLRepository(), new PostMongoRepository())
const userRepo = new UserDualRepository(new UserMySQLRepository(), new UserMongoRepository());
const idGenerator = new UUIDGenerator()
const bcryptPasswordService = new BcryptPasswordService()
const jwtTokenService = new JwtTokenService(process.env.JWT_SECRET as string)
const commentRepo = new CommentDualRepository(new CommentMySQLRepository(),new CommentMongoRepository())

const createCommentUseCase = new CreateCommentUseCase(userRepo, postRepo, idGenerator, commentRepo)
const deleteCommentUseCase = new DeleteCommentUseCase(userRepo, commentRepo, postRepo)

export const commentController = new CommentController(createCommentUseCase, deleteCommentUseCase)