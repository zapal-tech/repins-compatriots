import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DROP TABLE "last_names_rels";
DROP TABLE "localization";
DROP TABLE "localization_locales";
DROP TABLE "_localization_v";
DROP TABLE "_localization_v_locales";
ALTER TABLE "last_names" ADD COLUMN "document_id" integer;
DO $$ BEGIN
 ALTER TABLE "last_names" ADD CONSTRAINT "last_names_document_id_documents_id_fk" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_localization_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum__localization_v_version_status" AS ENUM('draft', 'published');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "last_names_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"documents_id" integer
);

CREATE TABLE IF NOT EXISTS "localization" (
	"id" serial PRIMARY KEY NOT NULL,
	"_status" "enum_localization_status",
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "localization_locales" (
	"translation" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "localization_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

CREATE TABLE IF NOT EXISTS "_localization_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"version__status" "enum__localization_v_version_status",
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean,
	"autosave" boolean
);

CREATE TABLE IF NOT EXISTS "_localization_v_locales" (
	"version_translation" jsonb,
	"id" serial PRIMARY KEY NOT NULL,
	"_locale" "_locales" NOT NULL,
	"_parent_id" integer NOT NULL,
	CONSTRAINT "_localization_v_locales_locale_parent_id_unique" UNIQUE("_locale","_parent_id")
);

ALTER TABLE "last_names" DROP CONSTRAINT "last_names_document_id_documents_id_fk";

CREATE INDEX IF NOT EXISTS "last_names_rels_order_idx" ON "last_names_rels" ("order");
CREATE INDEX IF NOT EXISTS "last_names_rels_parent_idx" ON "last_names_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "last_names_rels_path_idx" ON "last_names_rels" ("path");
CREATE INDEX IF NOT EXISTS "_localization_v_latest_idx" ON "_localization_v" ("latest");
CREATE INDEX IF NOT EXISTS "_localization_v_autosave_idx" ON "_localization_v" ("autosave");
ALTER TABLE "last_names" DROP COLUMN IF EXISTS "document_id";
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

DO $$ BEGIN
 ALTER TABLE "localization_locales" ADD CONSTRAINT "localization_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "localization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_localization_v_locales" ADD CONSTRAINT "_localization_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "_localization_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}
