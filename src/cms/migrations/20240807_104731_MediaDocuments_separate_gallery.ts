import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 ALTER TABLE "media_documents" DROP CONSTRAINT "media_documents_media_id_media_id_fk";

ALTER TABLE "media_documents" ADD COLUMN "alt" varchar;
ALTER TABLE "media_documents" ADD COLUMN "url" varchar;
ALTER TABLE "media_documents" ADD COLUMN "thumbnail_u_r_l" varchar;
ALTER TABLE "media_documents" ADD COLUMN "filename" varchar;
ALTER TABLE "media_documents" ADD COLUMN "mime_type" varchar;
ALTER TABLE "media_documents" ADD COLUMN "filesize" numeric;
ALTER TABLE "media_documents" ADD COLUMN "width" numeric;
ALTER TABLE "media_documents" ADD COLUMN "height" numeric;
ALTER TABLE "media_documents" ADD COLUMN "focal_x" numeric;
ALTER TABLE "media_documents" ADD COLUMN "focal_y" numeric;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_400_url" varchar;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_400_width" numeric;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_400_height" numeric;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_400_mime_type" varchar;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_400_filesize" numeric;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_400_filename" varchar;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_1280_url" varchar;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_1280_width" numeric;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_1280_height" numeric;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_1280_mime_type" varchar;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_1280_filesize" numeric;
ALTER TABLE "media_documents" ADD COLUMN "sizes_size_1280_filename" varchar;
CREATE UNIQUE INDEX IF NOT EXISTS "media_documents_filename_idx" ON "media_documents" ("filename");
CREATE INDEX IF NOT EXISTS "media_documents_sizes_size_400_sizes_size_400_filename_idx" ON "media_documents" ("sizes_size_400_filename");
CREATE INDEX IF NOT EXISTS "media_documents_sizes_size_1280_sizes_size_1280_filename_idx" ON "media_documents" ("sizes_size_1280_filename");
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "media_id";`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DROP INDEX IF EXISTS "media_documents_filename_idx";
DROP INDEX IF EXISTS "media_documents_sizes_size_400_sizes_size_400_filename_idx";
DROP INDEX IF EXISTS "media_documents_sizes_size_1280_sizes_size_1280_filename_idx";
ALTER TABLE "media_documents" ADD COLUMN "media_id" integer;
DO $$ BEGIN
 ALTER TABLE "media_documents" ADD CONSTRAINT "media_documents_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "alt";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "url";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "filename";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "mime_type";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "filesize";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "width";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "height";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "focal_x";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "focal_y";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_400_url";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_400_width";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_400_height";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_400_mime_type";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_400_filesize";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_400_filename";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_1280_url";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_1280_width";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_1280_height";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_1280_mime_type";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_1280_filesize";
ALTER TABLE "media_documents" DROP COLUMN IF EXISTS "sizes_size_1280_filename";`);
}
