export interface ICreateCommentRequestDTO {
    user_id : string,
    post_id : string,
    comment : string
}

export interface ICreateCommentResponseDTO {
    comment_id : string
}