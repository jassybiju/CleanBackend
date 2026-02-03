import type { Email } from "../value-objects/Email.js";

export class User{
    constructor(
        public readonly  id : string,
        public readonly name : string,        
        public readonly email : Email,
        public readonly hashedPassword : string
    ){}

  
}