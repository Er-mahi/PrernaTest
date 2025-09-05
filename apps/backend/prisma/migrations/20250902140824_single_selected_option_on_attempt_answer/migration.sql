/*
  Warnings:

  - You are about to drop the `_QuestionToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."NotificationType" AS ENUM ('INFO', 'SUCCESS', 'WARNING', 'ERROR', 'TEST_REMINDER', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED');

-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'FILL_IN_THE_BLANK', 'ESSAY');

-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('FREE', 'BASIC', 'PREMIUM', 'ENTERPRISE');

-- AlterEnum
ALTER TYPE "public"."AttemptStatus" ADD VALUE 'ABANDONED';

-- AlterEnum
ALTER TYPE "public"."OTPType" ADD VALUE 'EMAIL_VERIFICATION';

-- AlterEnum
ALTER TYPE "public"."PaymentStatus" ADD VALUE 'CANCELLED';

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'SUPER_ADMIN';

-- DropForeignKey
ALTER TABLE "public"."_QuestionToTag" DROP CONSTRAINT "_QuestionToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_QuestionToTag" DROP CONSTRAINT "_QuestionToTag_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TagToTest" DROP CONSTRAINT "_TagToTest_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_TagToTest" DROP CONSTRAINT "_TagToTest_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."accounts" DROP CONSTRAINT "accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."attempt_answers" DROP CONSTRAINT "attempt_answers_selectedOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."payments" DROP CONSTRAINT "payments_planId_fkey";

-- DropForeignKey
ALTER TABLE "public"."sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- AlterTable
ALTER TABLE "public"."attempt_answers" ADD COLUMN     "isCorrect" BOOLEAN,
ADD COLUMN     "marksAwarded" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."attempts" ADD COLUMN     "correctAnswers" INTEGER DEFAULT 0,
ADD COLUMN     "remainingTime" INTEGER,
ADD COLUMN     "unattempted" INTEGER DEFAULT 0,
ADD COLUMN     "wrongAnswers" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."options" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "public"."payments" ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "testId" TEXT,
ALTER COLUMN "planId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."plans" ADD COLUMN     "planType" "public"."PlanType" NOT NULL DEFAULT 'PREMIUM';

-- AlterTable
ALTER TABLE "public"."questions" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "questionType" "public"."QuestionType" NOT NULL DEFAULT 'SINGLE_CHOICE';

-- AlterTable
ALTER TABLE "public"."tags" ADD COLUMN     "color" TEXT DEFAULT '#3B82F6';

-- AlterTable
ALTER TABLE "public"."tests" ADD COLUMN     "allowReview" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "difficulty" "public"."Difficulty" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "passingScore" DOUBLE PRECISION,
ADD COLUMN     "randomizeQuestions" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "totalQuestions" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "totalMarks" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "negativeMarks" SET DEFAULT 0.25;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastLoginAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "public"."_QuestionToTag";

-- DropTable
DROP TABLE "public"."_TagToTest";

-- DropTable
DROP TABLE "public"."accounts";

-- DropTable
DROP TABLE "public"."sessions";

-- DropTable
DROP TABLE "public"."verificationtokens";

-- CreateTable
CREATE TABLE "public"."refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."profile_settings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "theme" TEXT DEFAULT 'light',
    "language" TEXT DEFAULT 'en',
    "timezone" TEXT DEFAULT 'UTC',
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "pushNotifications" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "profile_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "public"."NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."test_tags" (
    "testId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "test_tags_pkey" PRIMARY KEY ("testId","tagId")
);

-- CreateTable
CREATE TABLE "public"."question_tags" (
    "questionId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "question_tags_pkey" PRIMARY KEY ("questionId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "public"."refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "profile_settings_userId_key" ON "public"."profile_settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "public"."categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "public"."categories"("slug");

-- AddForeignKey
ALTER TABLE "public"."refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."profile_settings" ADD CONSTRAINT "profile_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tests" ADD CONSTRAINT "tests_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payments" ADD CONSTRAINT "payments_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."test_tags" ADD CONSTRAINT "test_tags_testId_fkey" FOREIGN KEY ("testId") REFERENCES "public"."tests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."test_tags" ADD CONSTRAINT "test_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."question_tags" ADD CONSTRAINT "question_tags_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."question_tags" ADD CONSTRAINT "question_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
