import { IUUIDGenerator } from "@application/interfaces/IUUIDGenerator";
import { v4 as uuidv4 } from "uuid";

export class UUIDGenerator implements IUUIDGenerator {
  generate(): string {
    return uuidv4();
  }
}
