import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_header_nav_items_link_link_type" AS ENUM('internal', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_footer_navigation_link_link_type" AS ENUM('internal', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "header_nav_items" RENAME COLUMN "link_type" TO "link_linkType";
ALTER TABLE "header_nav_items" RENAME COLUMN "link_label" TO "link_text";
ALTER TABLE "footer_navigation" RENAME COLUMN "link_type" TO "link_linkType";
ALTER TABLE "footer_navigation" RENAME COLUMN "link_label" TO "link_text";
ALTER TABLE "header_nav_items" ALTER COLUMN "link_linkType" SET DATA TYPE enum_header_nav_items_link_link_type;
ALTER TABLE "footer_navigation" ALTER COLUMN "link_linkType" SET DATA TYPE enum_footer_navigation_link_link_type;`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "enum_header_nav_items_link_type" AS ENUM('internal', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_footer_navigation_link_type" AS ENUM('internal', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "header_nav_items" RENAME COLUMN "link_linkType" TO "link_type";
ALTER TABLE "header_nav_items" RENAME COLUMN "link_text" TO "link_label";
ALTER TABLE "footer_navigation" RENAME COLUMN "link_linkType" TO "link_type";
ALTER TABLE "footer_navigation" RENAME COLUMN "link_text" TO "link_label";
ALTER TABLE "header_nav_items" ALTER COLUMN "link_type" SET DATA TYPE enum_header_nav_items_link_type;
ALTER TABLE "footer_navigation" ALTER COLUMN "link_type" SET DATA TYPE enum_footer_navigation_link_type;`);
}
