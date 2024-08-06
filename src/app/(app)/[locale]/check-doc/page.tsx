import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Payload } from 'payload';

import { jwtDecode } from '@app/utils/jwt';
import { getLocalApi } from '@app/utils/localApi';

import { Gutter } from '@app/components/Gutter';
import { Media } from '@app/components/Media';
import { PageGutter } from '@app/components/PageGutter';
import { Text } from '@app/components/Text';

import { getDictionary } from '@app/i18n';

import { Collection } from '@cms/types';
import { LastName, Media as MediaType } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

type CheckDocProps = {
  params: {
    locale: Locale;
  };
  searchParams: {
    token: string;
  };
};

const getLastNames = async ({
  localApi,
  isDraftMode,
  locale,
  id,
}: {
  localApi: Payload;
  isDraftMode?: boolean;
  id: LastName['id'];
  locale: Locale;
}) =>
  (
    await localApi.find({
      collection: Collection.LastNames,
      draft: isDraftMode,
      where: {
        id: { equals: id },
      },
      locale,
      depth: 4,
      limit: 1,
    })
  ).docs[0];

const CheckDoc = async ({ params: { locale }, searchParams: { token } }: CheckDocProps) => {
  if (!token) return notFound();
  const decode = jwtDecode({ token });

  const dateNow = Number(
    Date.now()
      .toString()
      .substring(0, Date.now().toString().length - 3),
  );
  if (!decode || dateNow > decode?.exp) return notFound();

  const { isEnabled: isDraftMode } = draftMode();
  const localApi = await getLocalApi();
  const dict = await getDictionary(locale);

  const id = decode?.data as LastName['id'];

  let lastName: LastName | null = null;

  try {
    lastName = await getLastNames({ localApi, isDraftMode, locale, id });
  } catch (error) {
    localApi.logger.error(error);
  }

  if (!lastName) return notFound();

  let docName: string | null = null;
  let media: MediaType | null = null;
  let publicComment: string | null | undefined = null;

  if (
    lastName.document &&
    typeof lastName.document === 'object' &&
    typeof lastName.document.media === 'object' &&
    typeof lastName.document.archive === 'object' &&
    typeof lastName.document.fund === 'object' &&
    lastName.document.fund
  ) {
    docName = `${lastName.document.archive.shortName}_${lastName.document.fund.shortName}_${!!lastName.document.description ? lastName.document.description : '-'}_${lastName.document.case}_${lastName.document.page}${lastName.document.reverseSide ? 'зв' : ''}`;

    media =
      lastName.document.media && lastName.document.media.media && typeof lastName.document.media.media === 'object'
        ? lastName.document.media.media
        : null;

    publicComment = lastName.document.publicComment;
  }

  return (
    <PageGutter>
      <Gutter>
        <Text size="h2" className="mb-6">
          {docName}
        </Text>

        {media && (
          <Media className="mb-6 size-full overflow-hidden" imgClassName="w-full" resource={media} unoptimized />
        )}

        <Text className="mb-4 w-full">
          {dict.checkDoc.documentNumber}:{lastName.documentNumber}
        </Text>

        <Text className="mb-12 w-full">{publicComment}</Text>

        <Link
          href={`/check-doc/help-read?token=${token}`}
          className="mb-24 block w-full rounded-full bg-mallard p-5 text-center text-gray-50"
        >
          <Text size="h3">{dict.checkDoc.helpRead}</Text>
        </Link>
      </Gutter>
    </PageGutter>
  );
};

export default CheckDoc;
