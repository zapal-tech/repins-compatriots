import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "media" RENAME COLUMN "sizes_size_400_url" TO "sizes_size_800_url";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_400_width" TO "sizes_size_800_width";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_400_height" TO "sizes_size_800_height";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_400_mime_type" TO "sizes_size_800_mime_type";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_400_filesize" TO "sizes_size_800_filesize";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_400_filename" TO "sizes_size_800_filename";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_1280_url" TO "sizes_size_1920_url";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_1280_width" TO "sizes_size_1920_width";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_1280_height" TO "sizes_size_1920_height";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_1280_mime_type" TO "sizes_size_1920_mime_type";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_1280_filesize" TO "sizes_size_1920_filesize";
  ALTER TABLE "media" RENAME COLUMN "sizes_size_1280_filename" TO "sizes_size_1920_filename";
  DROP INDEX IF EXISTS "media_sizes_size_400_sizes_size_400_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_size_1280_sizes_size_1280_filename_idx";
  CREATE INDEX IF NOT EXISTS "media_sizes_size_800_sizes_size_800_filename_idx" ON "media" USING btree ("sizes_size_800_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_size_1920_sizes_size_1920_filename_idx" ON "media" USING btree ("sizes_size_1920_filename");`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP INDEX IF EXISTS "media_sizes_size_800_sizes_size_800_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_size_1920_sizes_size_1920_filename_idx";
  ALTER TABLE "media" ADD COLUMN "sizes_size_400_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_size_400_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_size_400_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_size_400_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_size_400_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_size_400_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_size_1280_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_size_1280_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_size_1280_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_size_1280_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_size_1280_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_size_1280_filename" varchar;
  CREATE INDEX IF NOT EXISTS "media_sizes_size_400_sizes_size_400_filename_idx" ON "media" USING btree ("sizes_size_400_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_size_1280_sizes_size_1280_filename_idx" ON "media" USING btree ("sizes_size_1280_filename");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_800_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_800_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_800_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_800_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_800_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_800_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_filename";`);
}
