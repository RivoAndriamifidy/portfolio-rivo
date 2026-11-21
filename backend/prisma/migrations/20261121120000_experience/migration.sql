-- CreateTable Experience
CREATE TABLE IF NOT EXISTS "Experience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT,
    "period" TEXT NOT NULL,
    "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
