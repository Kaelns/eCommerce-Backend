import * as path from 'path';
import { DB } from '@/database/postgres/kysely-types.js';
import { Pool } from 'pg';
import { promises as fs } from 'fs';
import { ENV_DATABASE_URL } from '@/shared/config/envConfig.js';
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely';

export async function migrateToLatest() {
  const db = new Kysely<DB>({
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
      migrationFolder: path.join(__dirname, 'src/database/postgres/migrations')
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
  }

  await db.destroy();
}

migrateToLatest();
