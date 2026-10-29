import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

if (!process.env.DATABASE_URL) {
  const isProd = process.env.NODE_ENV === "production" || !!process.env.PORT;
  process.env.DATABASE_URL = isProd ? "file:/tmp/dev2.db" : "file:./prisma/dev2.db";
}

const targetDb = "/tmp/dev2.db";
const sourceDb = path.join(process.cwd(), "prisma/dev2.db");

function isValidSqliteDb(filePath: string): boolean {
  try {
    return fs.existsSync(filePath) && fs.statSync(filePath).size > 10240;
  } catch {
    return false;
  }
}

try {
  if (process.env.DATABASE_URL?.includes("/tmp/")) {
    if (isValidSqliteDb(sourceDb)) {
      if (!isValidSqliteDb(targetDb)) {
        fs.copyFileSync(sourceDb, targetDb);
        console.log("[PrismaDB] Copied populated prisma/dev2.db to /tmp/dev2.db");
      }
    } else if (!isValidSqliteDb(targetDb)) {
      console.log("[PrismaDB] Synchronizing SQLite database schema for /tmp/dev2.db...");
      execSync("npx prisma db push --skip-generate", {
        env: { ...process.env, DATABASE_URL: "file:/tmp/dev2.db" },
        stdio: "pipe"
      });
      console.log("[PrismaDB] Database schema synchronized successfully.");
      try {
        fs.copyFileSync(targetDb, sourceDb);
      } catch {}
    }
  } else {
    const localDbPath = path.resolve(process.env.DATABASE_URL.replace("file:", ""));
    if (!isValidSqliteDb(localDbPath)) {
      if (isValidSqliteDb(sourceDb) && localDbPath !== sourceDb) {
        fs.copyFileSync(sourceDb, localDbPath);
      } else {
        console.log(`[PrismaDB] Synchronizing SQLite database schema for ${localDbPath}...`);
        execSync("npx prisma db push --skip-generate", {
          env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
          stdio: "pipe"
        });
        console.log("[PrismaDB] Database schema synchronized successfully.");
      }
    }
  }
} catch (e) {
  console.error("[PrismaDB] Error setting up database:", e);
}

const prisma = new PrismaClient();
export { prisma };
