import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { Payload } from 'payload';

import { isSupportedLocale } from '@app/utils/i18n';
import { getLocalApi } from '@app/utils/localApi';
import { generateMeta } from '@app/utils/seo';

// import { Gutter } from '@app/components/Gutter';
// import { Hero } from '@app/components/Hero';
// import { Logo } from '@app/components/Logo';
// import { PageGutter } from '@app/components/PageGutter';

// import { RichText } from '@app/components/RichText';

import { Collection } from '@cms/types';
import { Page } from '@cms/types/generated-types';

import { Locale, locales } from '@shared/i18n';

type HomeProps = {
  params: {
    locale: Locale;
  };
};

const getHome = async ({
  localApi,
  isDraftMode,
  locale,
}: { localApi: Payload; isDraftMode?: boolean } & HomeProps['params']) =>
  (
    await localApi.find({
      collection: Collection.Pages,
      draft: isDraftMode,
      where: {
        slug: { equals: 'home' },
        'breadcrumbs.url': { equals: '/home' },
      },
      locale,
      limit: 1,
    })
  ).docs[0];

const Home = async ({ params: { locale } }: HomeProps) => {
  if (!isSupportedLocale(locale)) return;

  const { isEnabled: isDraftMode } = draftMode();

  const localApi = await getLocalApi();

  let home: Page | null = null;

  try {
    home = await getHome({ localApi, isDraftMode, locale });
  } catch (error) {
    localApi.logger.error(error);
  }

  if (!home) return notFound();

  return (
    <>
      {/* <Hero {...home.hero} /> */}

      {/* <PageGutter> */}
      {/* <Gutter>
          <RichText>{home.content}</RichText>
        </Gutter> */}
      {/* </PageGutter> */}
    </>
  );
};

export const generateStaticParams = (): HomeProps['params'][] => locales.map((locale) => ({ locale }));

export const generateMetadata = async ({ params: { locale } }: HomeProps): Promise<Metadata> => {
  if (!isSupportedLocale(locale)) return generateMeta({});

  const { isEnabled: isDraftMode } = draftMode();

  let home: Page | null = null;

  try {
    const localApi = await getLocalApi();

    home = await getHome({ localApi, isDraftMode, locale });
  } catch (error) {
    console.error(error);
  }

  return generateMeta({ doc: home });
};

export default Home;
