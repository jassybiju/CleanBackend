import { IPostWithAuthor } from "./IPostWithAuthor";

export interface IGetPostRequestDTO {
    post_id : string
}


export interface IGetPostResponseDTO extends IPostWithAuthor {}