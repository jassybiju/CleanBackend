import type { Email } from "../value-objects/Email.js";

export class User{
    constructor(
        private readonly  id : string,
        private readonly name : string,        
        private readonly email : Email,
        private readonly password : string
    ){}


}