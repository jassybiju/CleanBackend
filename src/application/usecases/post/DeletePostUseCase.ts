import { IBaseUseCase } from "@application/IBaseUseCase";
import { IDeletePostRequestDTO, IDeletePostResponseDTO } from "@dto/post/IDeletePostDTO";
import { IPostRepository } from "@ports/IPostRepository";
import { IUserRepository } from "@ports/IUserRepository";

export class DeletePostUseCase implements IBaseUseCase<IDeletePostRequestDTO, IDeletePostResponseDTO>{
    constructor(
        private readonly userRepo : IUserRepository,
        private readonly postRepo : IPostRepository
    ){}

    async execute(input: IDeletePostRequestDTO): Promise<IDeletePostResponseDTO> {
        const  {user_id , post_id}= input

        const [user,post] =await Promise.all([this.userRepo.findById(user_id),this.postRepo.findById(post_id)])
        console.log(user,post,user_id, post_id)
        if(!user || !post){
            throw new Error("Invalid request")
        }        

        if(post.authorId !== user.id){
            throw new Error("Invalid access")
        }

        await this.postRepo.delete(post.id)

        return {deletedId : post.id}
    }
}