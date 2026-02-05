import { DeleteCommentUseCase } from "@application/usecases/comment/DeleteCommentUseCase";
import { CreatePostUseCase } from "@application/usecases/post/CreatePostUseCase";
import { DeletePostUseCase } from "@application/usecases/post/DeletePostUseCase";
import { GetPostUseCase } from "@application/usecases/post/GetPostUseCase";
import { ListPostsUseCase } from "@application/usecases/post/ListPostsUseCase";
import { ICreatePostRequestDTO } from "@dto/post/ICreatePostDTO";
import { IDeletePostRequestDTO } from "@dto/post/IDeletePostDTO";
import { IGetPostRequestDTO } from "@dto/post/IGetPostDTO";
import { IListPostRequestDTO } from "@dto/post/IListPostDTO";
import { Request, Response, NextFunction } from "express";

export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly getPostUseCase: GetPostUseCase,
    private readonly listPostUseCase: ListPostsUseCase,
  ) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.createPostUseCase.execute({
        authorId: req.userId,
        ...req.body,
      } as ICreatePostRequestDTO);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.deletePostUseCase.execute({
        user_id : req.userId,
        post_id : req.params.id
      } as IDeletePostRequestDTO);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { post_id } = req.params;
      const result = await this.getPostUseCase.execute({
        post_id,
      } as IGetPostRequestDTO);
      res.status(200).json({ result });
    } catch (error) {
      next(error);
    }
  }

  async listPost(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit) || 10;
      const page = Number(req.query.page) || 1;
      const result = await this.listPostUseCase.execute({
        limit,
        page,
      } as IListPostRequestDTO);
      res.status(201).json({ result });
    } catch (error) {
      next(error);
    }
  }
}
