import { User } from "@domain/entities/User";
import { IUserRepository } from "@ports/IUserRepository";
import { UserModel } from "../model/user.model";
import { Email } from "@domain/value-objects/Email";

export class UserMongoRepository implements IUserRepository{
    async create(user: User): Promise<void> {
        await UserModel.create({_id : user.id, name : user.name, email : user.email.value , password : user.hashedPassword})
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({email : email}).lean()
        if(!user){
            return null
        }
        return new User(user._id, user.name, new Email(user.email), user.password)
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id)
        if(!user){
            return null
        }
        return new User(user._id, user.name, new Email(user.email), user.password)
    }

    
}