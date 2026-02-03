export class Comment{
    constructor(
        private readonly id : string,
        private readonly userId : string,
        private readonly postId : string,
    ){}
}