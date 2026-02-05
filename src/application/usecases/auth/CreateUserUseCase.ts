import {
  ICreateUserRequestDTO,
  ICreateUserResponseDTO,
} from "@dto/auth/ICreateUserDTO";
import { IBaseUseCase } from "../../IBaseUseCase";
import { User } from "@domain/entities/User";
import { IUUIDGenerator } from "@application//interfaces/IUUIDGenerator";
import { IPasswordService } from "@application/interfaces/IPasswordService";
import { Email } from "@domain/value-objects/Email";
import { IUserRepository } from "@application//ports/IUserRepository";

export class CreateUserUseCase implements IBaseUseCase<
  ICreateUserRequestDTO,
  ICreateUserResponseDTO
> {
  constructor(
    private readonly idGenerator: IUUIDGenerator,
    private readonly passwordHasher: IPasswordService,
    private readonly userRepo: IUserRepository,
  ) {}
  async execute(input: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const { email, name, password } = input;

    const exists = await this.userRepo.findByEmail(email)
    if(exists){
      throw new Error("User already exists")
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const user = new User(
      this.idGenerator.generate(),
      name,
      new Email(email),
      hashedPassword,
    );

  await this.userRepo.create(user);

    return { id: user.id, name: user.name, email: user.email.value };
  }
}
