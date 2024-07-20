import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 CREATE TABLE IF NOT EXISTS "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "funds" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "archives" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

ALTER TABLE "settings" ADD COLUMN "viber_url" varchar NOT NULL;
ALTER TABLE "settings" ADD COLUMN "whatsapp_url" varchar NOT NULL;
ALTER TABLE "settings" ADD COLUMN "instagram_url" varchar NOT NULL;
ALTER TABLE "settings" ADD COLUMN "facebook_url" varchar NOT NULL;
CREATE INDEX IF NOT EXISTS "documents_created_at_idx" ON "documents" ("created_at");
CREATE INDEX IF NOT EXISTS "funds_created_at_idx" ON "funds" ("created_at");
CREATE INDEX IF NOT EXISTS "archives_created_at_idx" ON "archives" ("created_at");`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DROP TABLE "documents";
DROP TABLE "funds";
DROP TABLE "archives";
ALTER TABLE "settings" DROP COLUMN IF EXISTS "viber_url";
ALTER TABLE "settings" DROP COLUMN IF EXISTS "whatsapp_url";
ALTER TABLE "settings" DROP COLUMN IF EXISTS "instagram_url";
ALTER TABLE "settings" DROP COLUMN IF EXISTS "facebook_url";`);
}
