import { IBaseUseCase } from "@application/IBaseUseCase";
import { ITokenService } from "@application/interfaces/ITokenService";
import { ICurrentUserRequestDTO, ICurrentUserResponseDTO } from "@dto/auth/ICurrentUserDTO";
import { IUserRepository } from "@ports/IUserRepository";


export class CurrentUserUseCase implements IBaseUseCase<ICurrentUserRequestDTO,ICurrentUserResponseDTO>{
    constructor(
        private readonly tokenService : ITokenService,
        private readonly userRepo : IUserRepository
    ){}

    async execute(input: ICurrentUserRequestDTO): Promise<ICurrentUserResponseDTO> {
        const {token} = input

        const decodedToken = this.tokenService.verifyAccessToken(token)

        if(!decodedToken){
            throw new Error("Invalid Token")
        }

        const user = await this.userRepo.findByEmail(decodedToken.email)

        if(!user){
            throw new Error("No User Found")
        }

        return {
            name : user.name,
            email : user.email.value,
            id : user.id
        }
    }
}