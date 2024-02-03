import { execSync } from "child_process";
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

module.exports = async () => {
  // make sure testing db is migrated
  execSync(
    `DATABASE_URL=${process.env.TEST_DATABASE_URL} npx prisma migrate deploy`
  );
};
