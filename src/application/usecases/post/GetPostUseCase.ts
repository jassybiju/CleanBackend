import { IBaseUseCase } from "@application/IBaseUseCase";
import { IGetPostRequestDTO, IGetPostResponseDTO } from "@dto/post/IGetPostDTO";
import { ICommentRepository } from "@ports/ICommentRepository";
import { IPostRepository } from "@ports/IPostRepository";
import { IUserRepository } from "@ports/IUserRepository";

export class GetPostUseCase implements IBaseUseCase<IGetPostRequestDTO, IGetPostResponseDTO> {
    constructor(
        private readonly postRepo : IPostRepository,
        private readonly userRepo : IUserRepository,
        private readonly commentRepo : ICommentRepository
    ){}

    async execute(input: IGetPostRequestDTO): Promise<IGetPostResponseDTO> {
        const {post_id} = input
        console.log(input)
        const post = await this.postRepo.findByIdWithAuthor(post_id)
        if(!post){
            throw new Error("Post not found")
        }
        const comments = await this.commentRepo.findByPostId(post.id)

        return {
            id : post.id,
            title : post.title,
            content : post.content,
            author : {
                id: post.author.id,
                name : post.author.name
            },
            comments
        }
    }
}