import { IBaseUseCase } from "@application/IBaseUseCase";
import { IListPostRequestDTO, IListPostResponseDTO } from "@dto/post/IListPostDTO";
import { IPostRepository } from "@ports/IPostRepository";

export class ListPostsUseCase implements IBaseUseCase<IListPostRequestDTO, IListPostResponseDTO>{
    constructor(
        private readonly postRepo : IPostRepository
    ){}

    async execute(input: IListPostRequestDTO): Promise<IListPostResponseDTO> {
        const {page , limit} = input

        const posts = await this.postRepo.list({limit, page})

        return {posts}
    }
}