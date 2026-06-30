import type { User } from "../../../generated/prisma/client.js";
import { comparePassword } from "../../lib/bcrypt.js";
import { prisma } from "../../lib/prisma.js";

export const loginService = async (body: Pick<User, "email" | "password">) => {
  try {
    const { email, password } = body;

    const user = await prisma.user.findFirst({ where: { email: email } });

    if (!user) {
      throw new Error("Incorrect email or password");
    }

    if (user.isDelete === true) {
      throw new Error(" This account has been deleted !");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Incorrect email or password");
    }
    return {
      message: "Login success",
      data: user,
    };
  } catch (error) {
    throw error;
  }
};
