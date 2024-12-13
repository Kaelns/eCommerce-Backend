import * as path from 'path';
import pg from 'pg';
const { Pool } = pg;
import { promises as fs } from 'fs';
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely';

const ENV_DATABASE_URL = process.env.DATABASE_URL;

if (!ENV_DATABASE_URL) {
  throw new Error('The db config is undefined');
} else if (!__dirname) {
  throw new Error('The __dirname variable is undefined');
}

export async function migrateToLatest() {
  const db = new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: ENV_DATABASE_URL
      })
    })
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations')
    })
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  } else {
    console.log('nothing to migrate');
  }

  await db.destroy();
}

migrateToLatest();
