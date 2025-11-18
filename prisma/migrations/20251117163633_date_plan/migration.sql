-- CreateTable
CREATE TABLE "public"."date_plans" (
    "id" SERIAL NOT NULL,
    "connectionId" INTEGER NOT NULL,
    "proposerId" INTEGER NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,
    "location" VARCHAR(200) NOT NULL,
    "notes" VARCHAR(500),
    "status" TEXT NOT NULL DEFAULT 'proposed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "date_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "date_plans_connectionId_idx" ON "public"."date_plans"("connectionId");

-- AddForeignKey
ALTER TABLE "public"."date_plans" ADD CONSTRAINT "date_plans_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "public"."connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."date_plans" ADD CONSTRAINT "date_plans_proposerId_fkey" FOREIGN KEY ("proposerId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
