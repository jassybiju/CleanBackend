export class Email{
    constructor(private readonly email : string ){
        if(!email.includes('@')){
            throw new Error('Email is invalid')
        }
    }

    get value(){
        return this.email
    }
}