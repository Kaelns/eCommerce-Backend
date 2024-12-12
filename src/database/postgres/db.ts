import pg from 'pg';
import { DB } from '@/database/postgres/kysely-types.js';
import { ENV_DATABASE_URL } from '@/shared/config/envConfig.js';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';

const { Pool } = pg;

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: ENV_DATABASE_URL
    })
  }),
  plugins: [new CamelCasePlugin()]
});
