import { IBaseUseCase } from "@application/IBaseUseCase";
import { IListPostRequestDTO, IListPostResponseDTO } from "@dto/post/IListPostDTO";
import { ICommentRepository } from "@ports/ICommentRepository";
import { IPostRepository } from "@ports/IPostRepository";

export class ListPostsUseCase implements IBaseUseCase<IListPostRequestDTO, IListPostResponseDTO>{
    constructor(
        private readonly postRepo : IPostRepository,
        private readonly commentRepo : ICommentRepository
    ){}

    async execute(input: IListPostRequestDTO): Promise<IListPostResponseDTO> {
        const {page , limit} = input
    
        const posts = await this.postRepo.list({limit, page})
        const postsWithComment = await Promise.all(posts.map(async post =>({...post, comments :await this.commentRepo.findByPostId(post.id)})))
        return {posts : postsWithComment}
    }
}