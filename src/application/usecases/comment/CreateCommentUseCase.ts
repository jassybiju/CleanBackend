import { IBaseUseCase } from "@application/IBaseUseCase";
import { IUUIDGenerator } from "@application/interfaces/IUUIDGenerator";
import { Comment } from "@domain/entities/Comment";
import {
  ICreateCommentRequestDTO,
  ICreateCommentResponseDTO,
} from "@dto/comment/ICreateCommentDTO";
import { ICommentRepository } from "@ports/ICommentRepository";
import { IPostRepository } from "@ports/IPostRepository";
import { IUserRepository } from "@ports/IUserRepository";

export class CreateCommentUseCase implements IBaseUseCase<
  ICreateCommentRequestDTO,
  ICreateCommentResponseDTO
> {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly postRepo: IPostRepository,
    private readonly idGenerator: IUUIDGenerator,
    private readonly commentRepo: ICommentRepository,
  ) {}

  async execute(
    input: ICreateCommentRequestDTO,
  ): Promise<ICreateCommentResponseDTO> {
    const { user_id, post_id, comment } = input;

    const [user, post] = await Promise.all([
      this.userRepo.findById(user_id),
      this.postRepo.findById(post_id),
    ]);

    if (!user || !post) {
      throw new Error("Invalid Request");
    }

    const commentInstance = new Comment(
      this.idGenerator.generate(),
      user_id,
      post_id,
      comment,
    );

    await this.commentRepo.create(commentInstance);

    return { comment_id: commentInstance.id };
  }
}
