import {
  ILoginUserRequestDTO,
  ILoginUserResponseDTO,
} from "@dto/auth/ILoginUserDTO";
import { IBaseUseCase } from "@application/IBaseUseCase";
import { IUserRepository } from "@application/ports/IUserRepository";
import { IPasswordService } from "@application/interfaces/IPasswordService";
import { ITokenService } from "@application/interfaces/ITokenService";

export class LoginUserUseCase implements IBaseUseCase<
  ILoginUserRequestDTO,
  ILoginUserResponseDTO
> {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly passwordHasher: IPasswordService,
    private readonly tokenService: ITokenService,
  ) {}

  async execute(input: ILoginUserRequestDTO): Promise<ILoginUserResponseDTO> {
    const { email, password } = input;

    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("User Not found");
    }

    const isPasswordCorrect = await this.passwordHasher.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }
    const accessToken = this.tokenService.createAccessToken(user.id);

    return {
      accessToken,
      email: user.email.value,
    };
  }
}
