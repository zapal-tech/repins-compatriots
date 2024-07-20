import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 CREATE TABLE IF NOT EXISTS "last_name" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_name" varchar,
	"original_last_name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "last_name_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"documents_id" integer
);

ALTER TABLE "documents" ADD COLUMN "media_id" integer NOT NULL;
ALTER TABLE "documents" ADD COLUMN "archive_id" integer NOT NULL;
ALTER TABLE "documents" ADD COLUMN "fund_id" integer NOT NULL;
ALTER TABLE "documents" ADD COLUMN "description" varchar;
ALTER TABLE "documents" ADD COLUMN "doc_name" varchar;
ALTER TABLE "documents" ADD COLUMN "case" varchar NOT NULL;
ALTER TABLE "documents" ADD COLUMN "page" numeric NOT NULL;
ALTER TABLE "documents" ADD COLUMN "reserse_side" boolean NOT NULL;
ALTER TABLE "documents" ADD COLUMN "public_comment" varchar;
ALTER TABLE "documents" ADD COLUMN "private_comment" varchar;
ALTER TABLE "funds" ADD COLUMN "archive_id" integer NOT NULL;
ALTER TABLE "funds" ADD COLUMN "short_name" varchar NOT NULL;
ALTER TABLE "funds" ADD COLUMN "name" varchar NOT NULL;
ALTER TABLE "archives" ADD COLUMN "short_name" varchar NOT NULL;
ALTER TABLE "archives" ADD COLUMN "name" varchar NOT NULL;
CREATE INDEX IF NOT EXISTS "last_name_created_at_idx" ON "last_name" ("created_at");
CREATE INDEX IF NOT EXISTS "last_name_rels_order_idx" ON "last_name_rels" ("order");
CREATE INDEX IF NOT EXISTS "last_name_rels_parent_idx" ON "last_name_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "last_name_rels_path_idx" ON "last_name_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_archive_id_archives_id_fk" FOREIGN KEY ("archive_id") REFERENCES "archives"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_fund_id_funds_id_fk" FOREIGN KEY ("fund_id") REFERENCES "funds"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "funds" ADD CONSTRAINT "funds_archive_id_archives_id_fk" FOREIGN KEY ("archive_id") REFERENCES "archives"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

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
`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DROP TABLE "last_name";
DROP TABLE "last_name_rels";
ALTER TABLE "documents" DROP CONSTRAINT "documents_media_id_media_id_fk";

ALTER TABLE "documents" DROP CONSTRAINT "documents_archive_id_archives_id_fk";

ALTER TABLE "documents" DROP CONSTRAINT "documents_fund_id_funds_id_fk";

ALTER TABLE "funds" DROP CONSTRAINT "funds_archive_id_archives_id_fk";

ALTER TABLE "documents" DROP COLUMN IF EXISTS "media_id";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "archive_id";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "fund_id";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "description";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "doc_name";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "case";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "page";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "reserse_side";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "public_comment";
ALTER TABLE "documents" DROP COLUMN IF EXISTS "private_comment";
ALTER TABLE "funds" DROP COLUMN IF EXISTS "archive_id";
ALTER TABLE "funds" DROP COLUMN IF EXISTS "short_name";
ALTER TABLE "funds" DROP COLUMN IF EXISTS "name";
ALTER TABLE "archives" DROP COLUMN IF EXISTS "short_name";
ALTER TABLE "archives" DROP COLUMN IF EXISTS "name";`);
}
