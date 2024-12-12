import pg from 'pg';
import { Kysely, PostgresDialect, CamelCasePlugin } from 'kysely';
import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error('The database_url env is undefined');
}

console.log(process.env.DATABASE_URL);

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL
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
