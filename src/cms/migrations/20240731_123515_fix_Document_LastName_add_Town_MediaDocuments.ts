import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 ALTER TYPE "enum_users_roles" ADD VALUE 'admin-database';
CREATE TABLE IF NOT EXISTS "towns" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "media_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"media_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "last_names" RENAME COLUMN "town" TO "town_id";
ALTER TABLE "documents" DROP CONSTRAINT "documents_media_id_media_id_fk";

ALTER TABLE "documents" ALTER COLUMN "media_id" DROP NOT NULL;
ALTER TABLE "documents" ALTER COLUMN "description" SET DATA TYPE numeric;
ALTER TABLE "documents" ALTER COLUMN "case" SET DATA TYPE numeric;
ALTER TABLE "last_names" ALTER COLUMN "last_name" SET NOT NULL;
ALTER TABLE "last_names" ALTER COLUMN "original_last_name" SET NOT NULL;
ALTER TABLE "last_names" ALTER COLUMN "town_id" SET DATA TYPE integer;
ALTER TABLE "last_names" ALTER COLUMN "town_id" SET NOT NULL;
CREATE INDEX IF NOT EXISTS "towns_created_at_idx" ON "towns" ("created_at");
CREATE INDEX IF NOT EXISTS "media_documents_created_at_idx" ON "media_documents" ("created_at");
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_media_id_media_documents_id_fk" FOREIGN KEY ("media_id") REFERENCES "media_documents"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "last_names" ADD CONSTRAINT "last_names_town_id_towns_id_fk" FOREIGN KEY ("town_id") REFERENCES "towns"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "media_documents" ADD CONSTRAINT "media_documents_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DROP TABLE "towns";
DROP TABLE "media_documents";
ALTER TABLE "documents" DROP CONSTRAINT "documents_media_id_media_documents_id_fk";

ALTER TABLE "last_names" DROP CONSTRAINT "last_names_town_id_towns_id_fk";

ALTER TABLE "documents" ALTER COLUMN "media_id" SET NOT NULL;
ALTER TABLE "documents" ALTER COLUMN "description" SET DATA TYPE varchar;
ALTER TABLE "documents" ALTER COLUMN "case" SET DATA TYPE varchar;
ALTER TABLE "last_names" ALTER COLUMN "last_name" DROP NOT NULL;
ALTER TABLE "last_names" ALTER COLUMN "original_last_name" DROP NOT NULL;
ALTER TABLE "last_names" ADD COLUMN "town" varchar;
DO $$ BEGIN
 ALTER TABLE "documents" ADD CONSTRAINT "documents_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "last_names" DROP COLUMN IF EXISTS "town_id";`);
}
