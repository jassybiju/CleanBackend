export interface IDeleteCommentRequestDTO {
    user_id : string,
    comment_id : string,
    post_id : string
}

export interface IDeleteCommentResponseDTO {
    deletedCommentId : string
}