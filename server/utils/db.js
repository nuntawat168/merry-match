import * as pg from "pg";
const { Pool } = pg.default;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  connectionString: `postgresql://postgres:${process.env.SUPABASE_PASSWORD}@db.gacngpsoekbrifxahpkg.supabase.co:5432/postgres`,
});

export { pool };
