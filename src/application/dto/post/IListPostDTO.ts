import { IPostWithAuthor } from "./IPostWithAuthor"

export interface IListPostRequestDTO {
    page : number,
    limit : number
}

export interface IListPostResponseDTO {
    posts : IPostWithAuthor[]
}