import { Comment } from "@domain/entities/Comment";
import { ICommentRepository } from "@ports/ICommentRepository";
import { commentModel } from "../model/comments.model";
import { ICommentView } from "@dto/comment/ICommentView";

export class CommentMongoRepository implements ICommentRepository {
  async create(comment: Comment): Promise<void> {
    await commentModel.create({
      _id: comment.id,
      comment: comment.comment,
      user_id: comment.userId,
      post_id: comment.postId,
    });
  }

  async findById(id: string): Promise<Comment | null> {
    const comment = await commentModel.findById(id);
    if (!comment) {
      return null;
    }
    return new Comment(
      comment._id,
      comment.user_id,
      comment.post_id,
      comment.comment,
    );
  }

  async findByPostId(postId: string): Promise<ICommentView[]> {
    const comments = await commentModel.find({ post_id: postId }).lean();
    return comments.map(comment => ({
        id : comment._id.toString(),
        user : comment.user_id,
        comment : comment.comment
    }))
  }

  async delete(id: string): Promise<void> {
      await commentModel.findByIdAndDelete(id)
  }
}
