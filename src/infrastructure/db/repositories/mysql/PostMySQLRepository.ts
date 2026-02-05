import { Post } from "@domain/entities/Post";
import { IPostWithAuthor } from "@dto/post/IPostWithAuthor";
import { IPostRepository } from "@ports/IPostRepository";
import { db } from "@infrastructure/db/mysql";
import { CommentMySQLRepository } from "./CommentMySQLRepository";
import { RowDataPacket } from "mysql2";

type PostRow = {
  id: string;
  title: string;
  content: string;
  author_id: string;
};

type UserRow = {
  id: string;
  name: string;
};

export class PostMySQLRepository implements IPostRepository {
  async findById(id: string): Promise<Post | null> {
    const [rows] = await db.execute<RowDataPacket[] & PostRow[]>(
      `SELECT * FROM posts WHERE id = ? LIMIT 1`,
      [id],
    );

    const row = rows[0];
    if (!row) return null;

    return new Post(row.id, row.title, row.content, row.author_id);
  }

  async findByIdWithAuthor(id: string): Promise<IPostWithAuthor | null> {
    const post = await this.findById(id);
    if (!post) return null;

    const [userRows] = await db.execute<RowDataPacket[] & UserRow[]>(
      `SELECT id, name FROM users WHERE id = ? LIMIT 1`,
      [post.authorId],
    );

    const user = userRows[0];
    if (!user) return null;

    const comments = await new CommentMySQLRepository().findByPostId(post.id);

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      author: { id: user.id, name: user.name },
      comments,
    };
  }

  async findByTitle(title: string): Promise<Post | null> {
    const [rows] = await db.execute<RowDataPacket[] & PostRow[]>(
      `SELECT * FROM posts WHERE title = ? LIMIT 1`,
      [title],
    );

    const row = rows[0];
    if (!row) return null;

    return new Post(row.id, row.title, row.content, row.author_id);
  }

    async list(params: { limit: number; page: number }): Promise<IPostWithAuthor[]> {
        const { limit, page } = params;
        const offset = (page - 1) * limit;
        console.log(typeof limit,offset)
       const [posts] = await db.query<RowDataPacket[] & PostRow[]>(
  `SELECT * FROM posts ORDER BY created_at DESC LIMIT ? OFFSET ?`,
  [limit, offset],
);
        console.log(posts)
        const commentRepo = new CommentMySQLRepository();

        const results = await Promise.all(
        posts.map(async (post) => {
            const [[user]] = await db.execute<RowDataPacket[] & UserRow[]>(
            `SELECT id, name FROM users WHERE id = ? LIMIT 1`,
            [post.author_id],
            );

            if (!user) return null;

            const comments = await commentRepo.findByPostId(post.id);

            return {
            id: post.id,
            title: post.title,
            content: post.content,
            author: { id: user.id, name: user.name },
            comments,
            } as IPostWithAuthor;
        }),
        );

        return results.filter((p): p is IPostWithAuthor => p !== null);
    }

  async delete(id: string): Promise<void> {
    await db.execute(`DELETE FROM comments WHERE post_id = ?`, [id]);
    await db.execute(`DELETE FROM posts WHERE id = ?`, [id]);
  }

  async create(post: Post): Promise<Post | null> {
    await db.execute(
      `INSERT INTO posts (id, title, content, author_id)
       VALUES (?, ?, ?, ?)`,
      [post.id, post.title, post.content, post.authorId],
    );

    return post;
  }
}
