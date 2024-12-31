import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config();

export const db = drizzle({
  connection: {
    url: process.env.TURSO_DATABASE_URL as string,
    authToken: process.env.TURSO_AUTH_TOKEN as string,
  },
  schema,
});
