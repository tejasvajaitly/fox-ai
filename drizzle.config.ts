import { defineConfig } from "drizzle-kit";

export default defineConfig({
  driver: "turso",
  dialect: "sqlite",
  schema: "./src/db/schema/*.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
});
