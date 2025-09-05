import prisma from "@/config/database";

export const UserService = {
  async profile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        // add only the fields you want to expose in profile
        createdAt: true,
      },
    });
  },

  async updateProfile(userId: string, data: Partial<{ name: string; email: string }>) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },
};
