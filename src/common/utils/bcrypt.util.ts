import * as bcrypt from "bcrypt";

type PasswordEncryptType = {
  saltRounds: number;
  plainPassword: string;
  hash: string;
};

/** Password encrypt */
const genSalt = (saltOrRounds: PasswordEncryptType["saltRounds"]) => {
  return bcrypt.genSalt(saltOrRounds);
};

export const passwordHash = async (
  plainPassword: PasswordEncryptType["plainPassword"],
): Promise<string> => {
  const saltRounds = 10;
  const salt = await genSalt(saltRounds);
  return bcrypt.hash(plainPassword, salt);
};

/** Password decrypt */
export const passwordMatch = (
  plainPassword: PasswordEncryptType["plainPassword"],
  hash: PasswordEncryptType["hash"],
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hash);
};
