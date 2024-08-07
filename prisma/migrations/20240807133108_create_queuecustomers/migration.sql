-- CreateTable
CREATE TABLE "queuecustomers" (
    "Id" SERIAL NOT NULL,
    "queueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "isAwaiting" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "queuecustomers_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "queuecustomers" ADD CONSTRAINT "queuecustomers_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
