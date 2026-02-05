import { PostMongoRepository } from "@infrastructure/db/repositories/mongo/PostMongoRepository";
import { PostController } from "../controllers/post.controller";
import { UserMongoRepository } from "@infrastructure/db/repositories/mongo/UserMongoRepository";
import { UUIDGenerator } from "@infrastructure/service/UUIDGenerator";
import { CreatePostUseCase } from "@application/usecases/post/CreatePostUseCase";
import { ListPostsUseCase } from "@application/usecases/post/ListPostsUseCase";
import { CommentMongoRepository } from "@infrastructure/db/repositories/mongo/CommentMongoRepository";
import { GetPostUseCase } from "@application/usecases/post/GetPostUseCase";
import { DeletePostUseCase } from "@application/usecases/post/DeletePostUseCase";
import { PostMySQLRepository } from "@infrastructure/db/repositories/mysql/PostMySQLRepository";
import { UserMySQLRepository } from "@infrastructure/db/repositories/mysql/UserMySQLRepository";
import { CommentMySQLRepository } from "@infrastructure/db/repositories/mysql/CommentMySQLRepository";
import { PostDualRepository } from "@infrastructure/db/repositories/dualDB/PostDualDBRepository";
import { UserDualRepository } from "@infrastructure/db/repositories/dualDB/UserDualDBRepository";



const postRepo = new PostDualRepository(new PostMySQLRepository(), new PostMongoRepository())
const userRepo = new UserDualRepository(new UserMySQLRepository(), new UserMongoRepository());
const idGenerator = new UUIDGenerator()
const commentRepo = new CommentMySQLRepository()

const createPostUseCase = new CreatePostUseCase(idGenerator, userRepo, postRepo)
const listPostUseCase = new ListPostsUseCase(postRepo, commentRepo)
const getPostUseCase = new GetPostUseCase(postRepo, userRepo, commentRepo)
const deletePostUseCase = new DeletePostUseCase(userRepo, postRepo)

export const postController = new PostController(createPostUseCase, deletePostUseCase, getPostUseCase, listPostUseCase)