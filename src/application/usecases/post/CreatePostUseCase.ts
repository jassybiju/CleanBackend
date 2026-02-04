import { IBaseUseCase } from "@application/IBaseUseCase";
import { IUUIDGenerator } from "@application/interfaces/IUUIDGenerator";
import { Post } from "@domain/entities/Post";
import { ICreatePostRequestDTO, ICreatePostResponseDTO } from "@dto/post/ICreatePostDTO";
import { IPostRepository } from "@ports/IPostRepository";
import { IUserRepository } from "@ports/IUserRepository";

export class CreatePostUseCase implements IBaseUseCase<ICreatePostRequestDTO, ICreatePostResponseDTO>{
    constructor(
        private readonly idGenerator : IUUIDGenerator,
        private readonly userRepo : IUserRepository,
        private readonly postRepo  : IPostRepository
    ){}

    async execute(input: ICreatePostRequestDTO): Promise<ICreatePostResponseDTO> {
        const {authorId, content, title} = input

        const author = await this.userRepo.findById(authorId)

        if(!author){
            throw new Error("Author doesn't exist")
        }

        const existingPost = await this.postRepo.findByTitle(title)

        if(existingPost){
            throw new Error('Post with the same title already exists')
        }

        const post = new Post(this.idGenerator.generate(),title, content, author.id)

        return {
            authorId : post.authorId,
            title : post.title,
            content : post.content,
            id : post.id
        }

    }
}