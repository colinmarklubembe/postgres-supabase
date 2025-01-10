import prisma from "../prisma/client";

class UserService {
  async createUser(name: string, email: string) {
    return await prisma.user.create({
      data: { name, email },
    });
  }

  async fetchUsers() {
    return await prisma.user.findMany();
  }

  async fetchUserById(id: number) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async fetchUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }

  async deleteAllUsers() {
    return await prisma.user.deleteMany();
  }
}

export default new UserService();
