import "server-only"
import mysql from "mysql2/promise"
import { drizzle } from "drizzle-orm/mysql2"
import { schema } from "./schema"

const globalForDb = globalThis as unknown as { mysqlPool?: mysql.Pool }

export const pool = globalForDb.mysqlPool ?? mysql.createPool({
  uri: process.env.DATABASE_URL,
  connectionLimit: 5,
  waitForConnections: true,
  enableKeepAlive: true,
})

if (process.env.NODE_ENV !== "production") globalForDb.mysqlPool = pool

export const db = drizzle({ client: pool, schema, mode: "default" })
