import { User } from "@domain/entities/User";
import { IUserRepository } from "@ports/IUserRepository";
import { Email } from "@domain/value-objects/Email";
import { db } from "@infrastructure/db/mysql";
import { RowDataPacket } from "mysql2";

type UserRow = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export class UserMySQLRepository implements IUserRepository {
  async create(user: User): Promise<void> {
    await db.execute(
      `INSERT INTO users (id, name, email, password)
       VALUES (?, ?, ?, ?)`,
      [user.id, user.name, user.email.value, user.hashedPassword],
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await db.execute<RowDataPacket[] & UserRow[]>(
      `SELECT * FROM users WHERE email = ? LIMIT 1`,
      [email],
    );

    const row = rows[0];
    if (!row) return null;

    return new User(row.id, row.name, new Email(row.email), row.password);
  }

  async findById(id: string): Promise<User | null> {
    const [rows] = await db.execute<RowDataPacket[] & UserRow[]>(
      `SELECT * FROM users WHERE id = ? LIMIT 1`,
      [id],
    );

    const row = rows[0];
    if (!row) return null;

    return new User(row.id, row.name, new Email(row.email), row.password);
  }

  async delete(id: string): Promise<void> {
    await db.execute(`DELETE FROM users WHERE id = ?`, [id]);
  }
}
