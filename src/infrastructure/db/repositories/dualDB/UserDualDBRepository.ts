import { User } from "@domain/entities/User";
import { IUserRepository } from "@ports/IUserRepository";
import { UserMySQLRepository } from "../mysql/UserMySQLRepository";


export class UserDualRepository implements IUserRepository {
  constructor(
    private readonly mysqlRepo  = new UserMySQLRepository(),
    private readonly mongoRepo : IUserRepository,
  ) {}

  async create(user: User): Promise<void> {
    let mysqlCreated = false;

    try {
      await this.mysqlRepo.create(user);
      mysqlCreated = true;

      await this.mongoRepo.create(user);

    } catch (err) {
      if (mysqlCreated) {
        try {
          await this.mysqlRepo.delete(user.id);
        } catch (rollbackErr) {
          console.error("User rollback failed in MySQL", rollbackErr);
        }
      }

      throw err;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.mysqlRepo.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.mysqlRepo.findById(id);
  }

   async delete(id: string): Promise<void> {
    let mysqlDeleted = false;

    try {
      await this.mysqlRepo.delete(id);
      mysqlDeleted = true;

      await this.mongoRepo.delete(id);

    } catch (err) {
      if (mysqlDeleted) {
        try {
          const user = await this.mongoRepo.findById(id);
          if (user) {
            await this.mysqlRepo.create(user);
          }
        } catch (rollbackErr) {
          console.error("User delete rollback failed", rollbackErr);
        }
      }

      throw err;
    }
  }
}
