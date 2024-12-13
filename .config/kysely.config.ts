import pg from 'pg';
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely';
import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl';

const { Pool } = pg;
const ENV_DATABASE_URL = process.env.DATABASE_URL;

if (!ENV_DATABASE_URL) {
  throw new Error('The database_url env is undefined');
}

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: ENV_DATABASE_URL
    })
  }),
  plugins: [new CamelCasePlugin()]
});

export default defineConfig({
  kysely: db,
  migrations: {
    getMigrationPrefix: getKnexTimestampPrefix,
    migrationFolder: './src/database/postgres/migrations'
  }
});
