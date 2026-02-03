export class Post{
    constructor(
        private readonly id : string,
        private readonly title : string,
        private readonly content : string,
        private readonly authorId : string,

    ){}
}