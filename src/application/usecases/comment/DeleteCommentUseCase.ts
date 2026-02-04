import { IBaseUseCase } from "@application/IBaseUseCase";
import { IDeleteCommentRequestDTO, IDeleteCommentResponseDTO } from "@dto/comment/IDeleteCommentDTO";
import { ICommentRepository } from "@ports/ICommentRepository";
import { IPostRepository } from "@ports/IPostRepository";
import { IUserRepository } from "@ports/IUserRepository";

export class DeleteCommentUseCase implements IBaseUseCase<IDeleteCommentRequestDTO,IDeleteCommentResponseDTO> {
    constructor(
        private readonly userRepo : IUserRepository,
        private readonly commentRepo : ICommentRepository,
        private readonly postRepo : IPostRepository,
    ){}

    async execute(input: IDeleteCommentRequestDTO): Promise<IDeleteCommentResponseDTO> {
        const {user_id , comment_id, post_id} = input

        const [user, comment, post] = await Promise.all([this.userRepo.findById(user_id),this.commentRepo.findById(comment_id),this.postRepo.findById(post_id)]) 

        if(!user || !comment || !post){
            throw new Error("Invalid Request")
        }
    }
}