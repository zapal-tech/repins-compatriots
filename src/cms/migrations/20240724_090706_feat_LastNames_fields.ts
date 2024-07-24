import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 ALTER TABLE "last_names" ADD COLUMN "year" numeric;
ALTER TABLE "last_names" ADD COLUMN "town" varchar;
ALTER TABLE "last_names" ADD COLUMN "address" varchar;
ALTER TABLE "last_names" ADD COLUMN "population_group" varchar;
ALTER TABLE "last_names" ADD COLUMN "social_status" varchar;`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 ALTER TABLE "last_names" DROP COLUMN IF EXISTS "year";
ALTER TABLE "last_names" DROP COLUMN IF EXISTS "town";
ALTER TABLE "last_names" DROP COLUMN IF EXISTS "address";
ALTER TABLE "last_names" DROP COLUMN IF EXISTS "population_group";
ALTER TABLE "last_names" DROP COLUMN IF EXISTS "social_status";`);
}
