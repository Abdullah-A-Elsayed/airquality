-- CreateTable
CREATE TABLE "Pollution" (
    "id" SERIAL NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "ts" TEXT NOT NULL,
    "aqius" DOUBLE PRECISION NOT NULL,
    "mainus" TEXT NOT NULL,
    "aqicn" DOUBLE PRECISION NOT NULL,
    "maincn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pollution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "locationIndex" ON "Pollution"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "aqiusIndex" ON "Pollution"("aqius");
