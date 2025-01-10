import postgres from "postgres";

const connectionString = process.env.DATABASE_URL_IPV4;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env");
}

let sql: any;

try {
  sql = postgres(connectionString);
} catch (error: any) {
  console.error("❌ Database connection failed:", error.message);
  process.exit(1);
}

export default sql;
