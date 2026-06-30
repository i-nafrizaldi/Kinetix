import { error } from "console";
import { prisma } from "../../lib/prisma.js";

export const getUsersService = async () => {
  try {
    const users = await prisma.user.findMany();

    if (!users) {
      throw new Error("Belum ada User");
    }

    return {
      message: "get users success",
      data: users,
    };
  } catch (error) {
    throw error;
  }
};
