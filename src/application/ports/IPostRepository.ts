import { Post } from "@domain/entities/Post";
import { IPostWithAuthor } from "@dto/post/IPostWithAuthor";

export interface IPostRepository {
    create(post : Post) : Promise<Post | null>,
    findByTitle(title : string) : Promise<Post | null>,
    findById(id : string) : Promise<Post | null>,
    findByIdWithAuthor(id : string) : Promise<IPostWithAuthor| null>
    list(params : {limit : number, page : number}) : Promise<IPostWithAuthor[]>,
    delete(id : string) : Promise<void>
}