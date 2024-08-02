import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 ALTER TABLE "documents" ALTER COLUMN "fund_id" DROP NOT NULL;
ALTER TABLE "documents" ADD COLUMN "title" varchar;
ALTER TABLE "last_names" ADD COLUMN "document_number" varchar;`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 ALTER TABLE "documents" ALTER COLUMN "fund_id" SET NOT NULL;
ALTER TABLE "documents" DROP COLUMN IF EXISTS "title";
ALTER TABLE "last_names" DROP COLUMN IF EXISTS "document_number";`);
}
