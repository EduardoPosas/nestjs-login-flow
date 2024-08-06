import { Injectable } from "@nestjs/common";
import { passwordHash, passwordMatch } from "./bcrypt.util";

@Injectable()
export class UtilsService {
  passwordHash(plainPassword: string) {
    return passwordHash(plainPassword);
  }

  passwordMatch(plainPassword: string, hashedPassword: string) {
    return passwordMatch(plainPassword, hashedPassword);
  }
}
