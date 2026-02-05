import { db } from "@infrastructure/db/mysql";
import { Comment } from "@domain/entities/Comment";
import { ICommentRepository } from "@ports/ICommentRepository";
import { ICommentView } from "@dto/comment/ICommentView";

export class CommentMySQLRepository implements ICommentRepository {
  async create(comment: Comment): Promise<void> {
    await db.execute(
      `INSERT INTO comments (id, comment, user_id, post_id)
       VALUES (?, ?, ?, ?)`,
      [comment.id, comment.comment, comment.userId, comment.postId],
    );
  }

  async findById(id: string): Promise<Comment | null> {
    const [rows] = await db.execute<any[]>(
      `SELECT * FROM comments WHERE id = ? LIMIT 1`,
      [id],
    );

    const row = rows[0];
    if (!row) return null;

    return new Comment(row.id, row.user_id, row.post_id, row.comment);
  }

  async findByPostId(postId: string): Promise<ICommentView[]> {
    const [rows] = await db.execute<any[]>(
      `SELECT id, user_id, comment FROM comments WHERE post_id = ? ORDER BY created_at DESC`,
      [postId],
    );

    return rows.map((row) => ({
      id: row.id,
      user: row.user_id,
      comment: row.comment,
    }));
  }

  async delete(id: string): Promise<void> {
    await db.execute(`DELETE FROM comments WHERE id = ?`, [id]);
  }
}
