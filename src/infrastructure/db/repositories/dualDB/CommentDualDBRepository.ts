import { Comment } from "@domain/entities/Comment";
import { ICommentRepository } from "@ports/ICommentRepository";
import { ICommentView } from "@dto/comment/ICommentView";


export class CommentDualRepository implements ICommentRepository {
  constructor(
    private readonly mysqlRepo : ICommentRepository,
    private readonly mongoRepo : ICommentRepository,
  ) {}

  async create(comment: Comment): Promise<void> {
    let mysqlCreated = false;

    try {
      // 1️⃣ Write to MySQL
      await this.mysqlRepo.create(comment);
      mysqlCreated = true;

      await this.mongoRepo.create(comment);

    } catch (err) {
      if (mysqlCreated) {
        try {
          await this.mysqlRepo.delete(comment.id);
        } catch (rollbackErr) {
          console.error("Rollback failed for comment (MySQL)", rollbackErr);
        }
      }

      throw err;
    }
  }

  async findById(id: string): Promise<Comment | null> {
    return this.mysqlRepo.findById(id);
  }

  async findByPostId(postId: string): Promise<ICommentView[]> {
    return this.mysqlRepo.findByPostId(postId);
  }

  async delete(id: string): Promise<void> {
    let mysqlDeleted = false;

    try {
      await this.mysqlRepo.delete(id);
      mysqlDeleted = true;

      await this.mongoRepo.delete(id);

    } catch (err) {
      if (mysqlDeleted) {
        try {
          const comment = await this.mongoRepo.findById(id);
          if (comment) {
            await this.mysqlRepo.create(comment);
          }
        } catch (rollbackErr) {
          console.error("Delete rollback failed for comment", rollbackErr);
        }
      }

      throw err;
    }
  }
}
