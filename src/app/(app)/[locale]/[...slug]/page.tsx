import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Payload } from 'payload';

import { isSupportedLocale } from '@app/utils/i18n';
import { getLocalApi } from '@app/utils/localApi';
import { generateMeta } from '@app/utils/seo';
import { getPathFromSlugArr, getSlugArrFromPath } from '@app/utils/slug';

import { Gutter } from '@app/components/Gutter';
import { Hero } from '@app/components/Hero';
import { PageGutter } from '@app/components/PageGutter';
import { RichText } from '@app/components/RichText';

import { Collection } from '@cms/types';
import type { Page } from '@cms/types/generated-types';

import { Locale, locales } from '@shared/i18n';
import { getLastFromArray } from '@shared/utils';

type PageProps = {
  params: {
    slug: string[];
    locale: Locale;
  };
};

const getPage = async ({
  localApi,
  isDraftMode,
  locale,
  slug,
}: { localApi: Payload; isDraftMode?: boolean } & PageProps['params']) =>
  (
    await localApi.find({
      collection: Collection.Pages,
      draft: isDraftMode,
      locale,
      where: {
        slug: { equals: getLastFromArray(slug) },
        'breadcrumbs.url': { equals: getPathFromSlugArr(slug) },
      },
      limit: 1,
    })
  ).docs[0] as Page | null;

const Page = async ({ params: { slug, locale } }: PageProps) => {
  if (!isSupportedLocale(locale)) return;

  const { isEnabled: isDraftMode } = draftMode();

  const localApi = await getLocalApi();

  let page: Page | null = null;

  try {
    page = await getPage({ localApi, isDraftMode, locale, slug });
  } catch (error) {
    localApi.logger.error(error);
  }

  if (!page) return notFound();

  return (
    <div className="overflow-hidden">
      <Hero {...page.hero} />

      <PageGutter>
        <Gutter>
          <RichText locale={locale}>{page.content}</RichText>
        </Gutter>
      </PageGutter>
    </div>
  );
};

export const generateStaticParams = async (): Promise<PageProps['params'][]> => {
  let allPages: PageProps['params'][] = [];

  try {
    const localApi = await getLocalApi();

    locales.map(async (locale) => {
      try {
        const pages = (
          await localApi.find({
            collection: Collection.Pages,
            locale,
            limit: 1000,
            depth: 0,
          })
        ).docs;

        const staticPagesParams = pages.map(({ breadcrumbs }) => ({
          slug: getSlugArrFromPath(getLastFromArray(breadcrumbs || [])?.url || ''),
          locale,
        }));

        allPages = allPages.concat(staticPagesParams);
      } catch (error) {
        console.error(error);
      }
    });
  } catch (error) {
    console.error(error);
  }

  return allPages;
};

export const generateMetadata = async ({ params: { locale, slug } }: PageProps): Promise<Metadata> => {
  if (!isSupportedLocale(locale)) return generateMeta({ locale });

  const { isEnabled: isDraftMode } = draftMode();

  let page: Page | null = null;

  try {
    const localApi = await getLocalApi();

    page = await getPage({ localApi, isDraftMode, locale, slug });
  } catch (error) {
    console.error(error);
  }

  return generateMeta({ doc: page, locale });
};

export default Page;
