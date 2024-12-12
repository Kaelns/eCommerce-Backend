/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('commerce_user')
    .addColumn('user_id', 'serial', (col) => col.primaryKey())
    .addColumn('email', 'varchar', (col) => col.notNull())
    .addColumn('access_token', 'varchar', (col) => col.notNull())
    .addColumn('refresh_token', 'varchar', (col) => col.notNull())
    .addColumn('updated_at', 'timestamptz', (col) => col.defaultTo(sql`now()`).notNull())
    .addColumn('expires_after', 'varchar(50)', (col) => col.defaultTo('2d:200d').notNull())
    .execute();

  await sql`
  CREATE FUNCTION update_column_updated_at() RETURNS TRIGGER LANGUAGE plpgsql AS 
  $$
  begin
      IF old.access_token <> new.access_token THEN
          new.updated_at := now();
      END IF;
      RETURN new;
  end;
  $$;
  `.execute(db);

  await sql`
  CREATE TRIGGER updated_at_generation BEFORE
  UPDATE ON commerce_user FOR EACH ROW
  EXECUTE PROCEDURE update_column_updated_at ();
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('commerce_user').execute();
  await sql`DROP TRIGGER updated_at_generation ON commerce_user;`.execute(db);
  await sql`DROP FUNCTION update_column_updated_at();`.execute(db);
}
