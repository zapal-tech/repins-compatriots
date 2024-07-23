import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 CREATE TABLE IF NOT EXISTS "search" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"priority" numeric,
	"original_last_name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "search_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"documents_id" integer,
	"last_names_id" integer
);

ALTER TABLE "last_name" RENAME TO "last_names";
ALTER TABLE "last_name_rels" RENAME TO "last_names_rels";
ALTER TABLE "last_names_rels" DROP CONSTRAINT "last_name_rels_parent_fk";

ALTER TABLE "last_names_rels" DROP CONSTRAINT "last_name_rels_documents_fk";

DROP INDEX IF EXISTS "media_sizes_size_768_sizes_size_768_filename_idx";
DROP INDEX IF EXISTS "media_sizes_size_1024_sizes_size_1024_filename_idx";
DROP INDEX IF EXISTS "media_sizes_size_1440_sizes_size_1440_filename_idx";
DROP INDEX IF EXISTS "media_sizes_size_1920_sizes_size_1920_filename_idx";
DROP INDEX IF EXISTS "media_sizes_size_2560_sizes_size_2560_filename_idx";
DROP INDEX IF EXISTS "last_name_created_at_idx";
DROP INDEX IF EXISTS "last_name_rels_order_idx";
DROP INDEX IF EXISTS "last_name_rels_parent_idx";
DROP INDEX IF EXISTS "last_name_rels_path_idx";
ALTER TABLE "media" ADD COLUMN "sizes_size_400_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_400_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_400_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_400_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_400_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_400_filename" varchar;
CREATE INDEX IF NOT EXISTS "search_created_at_idx" ON "search" ("created_at");
CREATE INDEX IF NOT EXISTS "search_rels_order_idx" ON "search_rels" ("order");
CREATE INDEX IF NOT EXISTS "search_rels_parent_idx" ON "search_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "search_rels_path_idx" ON "search_rels" ("path");
CREATE INDEX IF NOT EXISTS "media_sizes_size_400_sizes_size_400_filename_idx" ON "media" ("sizes_size_400_filename");
CREATE INDEX IF NOT EXISTS "last_names_created_at_idx" ON "last_names" ("created_at");
CREATE INDEX IF NOT EXISTS "last_names_rels_order_idx" ON "last_names_rels" ("order");
CREATE INDEX IF NOT EXISTS "last_names_rels_parent_idx" ON "last_names_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "last_names_rels_path_idx" ON "last_names_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "last_names_rels" ADD CONSTRAINT "last_names_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "last_names"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "last_names_rels" ADD CONSTRAINT "last_names_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_768_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_768_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_768_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_768_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_768_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_768_filename";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1024_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1024_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1024_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1024_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1024_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1024_filename";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1440_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1440_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1440_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1440_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1440_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1440_filename";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_1920_filename";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_2560_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_2560_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_2560_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_2560_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_2560_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_2560_filename";
DO $$ BEGIN
 ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "search"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_last_names_fk" FOREIGN KEY ("last_names_id") REFERENCES "last_names"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DROP TABLE "search";
DROP TABLE "search_rels";
ALTER TABLE "last_names" RENAME TO "last_name";
ALTER TABLE "last_names_rels" RENAME TO "last_name_rels";
ALTER TABLE "last_name_rels" DROP CONSTRAINT "last_names_rels_parent_fk";

ALTER TABLE "last_name_rels" DROP CONSTRAINT "last_names_rels_documents_fk";

DROP INDEX IF EXISTS "media_sizes_size_400_sizes_size_400_filename_idx";
DROP INDEX IF EXISTS "last_names_created_at_idx";
DROP INDEX IF EXISTS "last_names_rels_order_idx";
DROP INDEX IF EXISTS "last_names_rels_parent_idx";
DROP INDEX IF EXISTS "last_names_rels_path_idx";
ALTER TABLE "media" ADD COLUMN "sizes_size_768_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_768_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_768_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_768_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_768_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_768_filename" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1024_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1024_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1024_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1024_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1024_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1024_filename" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1440_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1440_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1440_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1440_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1440_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1440_filename" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1920_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1920_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1920_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1920_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_1920_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_1920_filename" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_2560_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_2560_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_2560_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_2560_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_size_2560_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_size_2560_filename" varchar;
CREATE INDEX IF NOT EXISTS "media_sizes_size_768_sizes_size_768_filename_idx" ON "media" ("sizes_size_768_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_size_1024_sizes_size_1024_filename_idx" ON "media" ("sizes_size_1024_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_size_1440_sizes_size_1440_filename_idx" ON "media" ("sizes_size_1440_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_size_1920_sizes_size_1920_filename_idx" ON "media" ("sizes_size_1920_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_size_2560_sizes_size_2560_filename_idx" ON "media" ("sizes_size_2560_filename");
CREATE INDEX IF NOT EXISTS "last_name_created_at_idx" ON "last_name" ("created_at");
CREATE INDEX IF NOT EXISTS "last_name_rels_order_idx" ON "last_name_rels" ("order");
CREATE INDEX IF NOT EXISTS "last_name_rels_parent_idx" ON "last_name_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "last_name_rels_path_idx" ON "last_name_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "last_name_rels" ADD CONSTRAINT "last_name_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "last_name"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "last_name_rels" ADD CONSTRAINT "last_name_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "documents"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_400_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_400_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_400_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_400_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_400_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_size_400_filename";`);
}
