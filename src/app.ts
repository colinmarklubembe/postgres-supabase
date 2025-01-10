import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import { supabase } from "./supabase/client";
import sql from "./config";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

const PORT = process.env.PORT || 8080;

async function testDatabaseConnection() {
  try {
    const result = await sql`SELECT 1 + 1 AS sum`;
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testDatabaseConnection();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
