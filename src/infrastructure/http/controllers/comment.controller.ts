import { CreateCommentUseCase } from "@application/usecases/comment/CreateCommentUseCase";
import { DeleteCommentUseCase } from "@application/usecases/comment/DeleteCommentUseCase";
import { ICreateCommentRequestDTO } from "@dto/comment/ICreateCommentDTO";
import { IDeleteCommentRequestDTO } from "@dto/comment/IDeleteCommentDTO";
import { Request, Response, NextFunction } from "express";

export class CommentController {
    constructor(
        private readonly createCommentUseCase : CreateCommentUseCase,
        private readonly deleteCommentUseCase : DeleteCommentUseCase,
    ){}   

    async create(req : Request, res : Response, next : NextFunction){
        try {
            const {post_id} = req.params
            const result = await this.createCommentUseCase.execute({user_id : req.userId,post_id , comment : req.body.comment } as ICreateCommentRequestDTO)
            res.status(201).json({result})
        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res : Response, next : NextFunction){
        try {
            const {post_id, comment_id} = req.params
            const result = await this.deleteCommentUseCase.execute({user_id : req.userId, post_id , comment_id} as IDeleteCommentRequestDTO)
            res.status(200).json({result})

        } catch (error) {
            next(error)
        }
    }
}