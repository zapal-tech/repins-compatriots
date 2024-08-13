import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 ALTER TABLE "media" ALTER COLUMN "prefix" SET DEFAULT 'public/media';
ALTER TABLE "open_graph_images" ALTER COLUMN "prefix" SET DEFAULT 'public/open-graph-images';
ALTER TABLE "pages" ALTER COLUMN "_status" SET DEFAULT 'draft';
ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" SET DEFAULT 'sm';
ALTER TABLE "_pages_v" ALTER COLUMN "version__status" SET DEFAULT 'draft';
ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" SET DEFAULT 'sm';
ALTER TABLE "users" ALTER COLUMN "login_attempts" SET DEFAULT 0;
ALTER TABLE "documents" ALTER COLUMN "reverse_side" SET DEFAULT false;
ALTER TABLE "media_documents" ALTER COLUMN "prefix" SET DEFAULT 'public/documents-media';
ALTER TABLE "redirects" ALTER COLUMN "to_type" SET DEFAULT 'reference';
ALTER TABLE "header_nav_items" ALTER COLUMN "link_linkType" SET DEFAULT 'internal';
ALTER TABLE "header_nav_items" ALTER COLUMN "link_new_tab" SET DEFAULT false;
ALTER TABLE "header_nav_items" ALTER COLUMN "link_no_follow" SET DEFAULT false;
ALTER TABLE "footer_navigation" ALTER COLUMN "link_linkType" SET DEFAULT 'internal';
ALTER TABLE "footer_navigation" ALTER COLUMN "link_new_tab" SET DEFAULT false;
ALTER TABLE "footer_navigation" ALTER COLUMN "link_no_follow" SET DEFAULT false;
CREATE INDEX IF NOT EXISTS "pages__status_idx" ON "pages" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
 DROP INDEX IF EXISTS "pages__status_idx";
DROP INDEX IF EXISTS "_pages_v_version_version__status_idx";
ALTER TABLE "media" ALTER COLUMN "prefix" DROP DEFAULT;
ALTER TABLE "open_graph_images" ALTER COLUMN "prefix" DROP DEFAULT;
ALTER TABLE "pages" ALTER COLUMN "_status" DROP DEFAULT;
ALTER TABLE "pages_locales" ALTER COLUMN "hero_type" DROP DEFAULT;
ALTER TABLE "_pages_v" ALTER COLUMN "version__status" DROP DEFAULT;
ALTER TABLE "_pages_v_locales" ALTER COLUMN "version_hero_type" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "login_attempts" DROP DEFAULT;
ALTER TABLE "documents" ALTER COLUMN "reverse_side" DROP DEFAULT;
ALTER TABLE "media_documents" ALTER COLUMN "prefix" DROP DEFAULT;
ALTER TABLE "redirects" ALTER COLUMN "to_type" DROP DEFAULT;
ALTER TABLE "header_nav_items" ALTER COLUMN "link_linkType" DROP DEFAULT;
ALTER TABLE "header_nav_items" ALTER COLUMN "link_new_tab" DROP DEFAULT;
ALTER TABLE "header_nav_items" ALTER COLUMN "link_no_follow" DROP DEFAULT;
ALTER TABLE "footer_navigation" ALTER COLUMN "link_linkType" DROP DEFAULT;
ALTER TABLE "footer_navigation" ALTER COLUMN "link_new_tab" DROP DEFAULT;
ALTER TABLE "footer_navigation" ALTER COLUMN "link_no_follow" DROP DEFAULT;`);
}
