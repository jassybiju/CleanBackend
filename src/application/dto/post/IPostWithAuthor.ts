import { ICommentView } from "@dto/comment/ICommentView";

export interface IPostWithAuthor {
    id : string,
    title : string,
    content : string,
    author : {
        id : string,
        name : string
    },
    comments : ICommentView[]
}