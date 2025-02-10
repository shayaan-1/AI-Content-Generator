import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
    }
  };
  