import { Post } from "@domain/entities/Post";
import { IPostWithAuthor } from "@dto/post/IPostWithAuthor";
import { IPostRepository } from "@ports/IPostRepository";

export class PostDualRepository implements IPostRepository {
  constructor(
    private readonly mysqlRepo : IPostRepository,
    private readonly mongoRepo : IPostRepository,
  ) {}

  async create(post: Post): Promise<Post | null> {
    let mysqlCreated = false;

    try {
      await this.mysqlRepo.create(post);
      mysqlCreated = true;

      await this.mongoRepo.create(post);

      return post;

    } catch (err) {
      if (mysqlCreated) {
        try {
          await this.mysqlRepo.delete(post.id);
        } catch (rollbackErr) {
          console.error("Rollback failed for MySQL", rollbackErr);
        }
      }

      throw err;
    }
  }

  async findById(id: string) {
    return this.mysqlRepo.findById(id);
  }

  async findByIdWithAuthor(id: string): Promise<IPostWithAuthor | null> {
    return this.mysqlRepo.findByIdWithAuthor(id);
  }

  async findByTitle(title: string) {
    return this.mysqlRepo.findByTitle(title);
  }

  async list(params: { limit: number; page: number }) {
    return this.mysqlRepo.list(params);
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
          const post = await this.mongoRepo.findById(id);
          if (post) {
            await this.mysqlRepo.create(post);
          }
        } catch (rollbackErr) {
          console.error("Delete rollback failed", rollbackErr);
        }
      }

      throw err;
    }
  }
}
