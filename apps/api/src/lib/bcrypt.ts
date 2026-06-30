import * as bcrypt from "bcrypt";

export const comparePassword = async (
  candidatePassword: string | null,
  hashedPassword: string | null,
) => {
  return await bcrypt.compare(candidatePassword!, hashedPassword!);
};

export const hashPassword = async (password: string | null) => {
  const saltRounds = 10;
  return await bcrypt.hash(password!, saltRounds);
};
