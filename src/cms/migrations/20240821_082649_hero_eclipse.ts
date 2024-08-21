import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_eclipse_type" AS ENUM('full', 'gradient', 'none');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_pages_hero_eclipse_opacity" AS ENUM('100', '80', '70', '60');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_eclipse_type" AS ENUM('full', 'gradient', 'none');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum__pages_v_version_hero_eclipse_opacity" AS ENUM('100', '80', '70', '60');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  ALTER TABLE "pages" ADD COLUMN "hero_eclipseType" "enum_pages_hero_eclipse_type" DEFAULT 'none';
  ALTER TABLE "pages" ADD COLUMN "hero_eclipseOpacity" "enum_pages_hero_eclipse_opacity" DEFAULT '100';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_eclipseType" "enum__pages_v_version_hero_eclipse_type" DEFAULT 'none';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_eclipseOpacity" "enum__pages_v_version_hero_eclipse_opacity" DEFAULT '100';`);
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_eclipseType";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_eclipseOpacity";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_eclipseType";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_eclipseOpacity";`);
}
