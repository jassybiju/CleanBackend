import { Comment } from "@domain/entities/Comment";
import { Post } from "@domain/entities/Post";
import { ICommentView } from "@dto/comment/ICommentView";

export interface ICommentRepository {
    create(comment : Comment) : Promise<void>,
    findById(id : string) : Promise<Comment | null>,
    delete(id : string) : Promise<void>,
    findByPostId(postId : string) : Promise<ICommentView[]>
}