export class Post{
    constructor(
        public readonly id : string,
        public readonly title : string,
        public readonly content : string,
        public readonly authorId : string,
    ){

        if(title.length < 3){
            throw new Error("Title should be more than 3 characters")
        }

        if(content.length < 3){
            throw new Error("Content should be more than 3 characters")
        }
    }
}