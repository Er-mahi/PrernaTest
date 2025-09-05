import prisma from "@/config/database";

class TestService {
  async list(query: any) {
    const page = Number(query.page ?? 1);
    const limit = Number(query.limit ?? 10);
    const search = (query.search as string) ?? "";
    const isFree = query.isFree !== undefined ? query.isFree === "true" : undefined;

    const where: any = { status: "PUBLISHED" };
    if (search) where.OR = [{ title: { contains: search, mode: "insensitive" } }, { description: { contains: search, mode: "insensitive" } }];
    if (isFree !== undefined) where.isFree = isFree;

    const [tests, total] = await Promise.all([
      prisma.test.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: { id: true, title: true, description: true, duration: true, totalMarks: true, isFree: true, price: true, createdAt: true }
      }),
      prisma.test.count({ where })
    ]);

    return { data: { tests, pagination: { current: page, total: Math.ceil(total / limit), count: tests.length, totalTests: total } } };
  }

  async get(id: string, userId?: string) {
    const test = await prisma.test.findUnique({
      where: { id },
      select: {
        id: true, title: true, description: true, duration: true, totalMarks: true, instructions: true,
        negativeMarking: true, negativeMarks: true, isFree: true, price: true, createdAt: true,
        sections: { select: { id: true, title: true, order: true, _count: { select: { questions: true } } }, orderBy: { order: "asc" } }
      }
    });
    if (!test) throw new Error("Not found");

    let userAttempt = null;
    if (userId) {
  userAttempt = await prisma.attempt.findFirst({
    where: { userId, testId: id },
    select: { id: true, status: true, score: true, percentage: true, submittedAt: true },
    orderBy: { submittedAt: "desc" } // ✅ fixed
  });
}
    return { test, userAttempt };
  }

  create(data: any) { return prisma.test.create({ data }); }
  update(id: string, data: any) { return prisma.test.update({ where: { id }, data }); }

  async remove(id: string) {
    const attempts = await prisma.attempt.count({ where: { testId: id } });
    if (attempts > 0) throw new Error("Cannot delete test with attempts");
    await prisma.test.delete({ where: { id } });
  }

  async publish(id: string) {
    const hasAnyQuestion = await prisma.section.findFirst({
      where: { testId: id },
      select: { _count: { select: { questions: true } } }
    });
    if (!hasAnyQuestion || hasAnyQuestion._count.questions === 0) throw new Error("Add questions before publishing");
    return prisma.test.update({ where: { id }, data: { status: "PUBLISHED" } });
  }

  previewQuestions(id: string) {
    return prisma.test.findUnique({
      where: { id },
      select: {
        id: true, title: true,
        sections: {
          select: {
            id: true, title: true, order: true,
            questions: {
              select: {
                id: true, order: true, marks: true,
                question: {
                  select: {
                    id: true, content: true, explanation: true, marks: true, difficulty: true,
                    options: { select: { id: true, content: true, isCorrect: true, order: true }, orderBy: { order: "asc" } }
                  }
                }
              },
              orderBy: { order: "asc" }
            }
          },
          orderBy: { order: "asc" }
        }
      }
    });
  }

  categories() { return []; }
}
export const testService = new TestService();
