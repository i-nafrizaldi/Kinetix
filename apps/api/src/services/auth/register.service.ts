import type { User } from "../../../generated/prisma/client.js";
import { hashPassword } from "../../lib/bcrypt.js";
import { prisma } from "../../lib/prisma.js";

export const registerService = async (body: Omit<User, "id">) => {
  try {
    const { email, name, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error("Email already exist");
    }
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { name: name, email: email, password: hashedPassword },
    });

    return {
      message: "register success",
      data: newUser,
    };
  } catch (error) {
    throw error;
  }
};
