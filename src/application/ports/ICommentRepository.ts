import { Comment } from "@domain/entities/Comment";

export interface ICommentRepository {
    create(comment : Comment) : Promise<void>,
    findById(id : string) : Promise<Comment | null>,
    
}