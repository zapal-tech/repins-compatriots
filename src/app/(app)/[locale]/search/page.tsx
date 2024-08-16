import Link from 'next/link';

import { GroupData, groupDataByLastName } from '@app/utils/groupDataByLastName';
import { isSupportedLocale } from '@app/utils/i18n';
import { getLocalApi } from '@app/utils/localApi';
import { searchLastNames } from '@app/utils/searchLastNames';

import { Gutter } from '@app/components/Gutter';
import { PageGutter } from '@app/components/PageGutter';
import { Text } from '@app/components/Text';

import { getDictionary } from '@app/i18n';

import { Locale } from '@shared/i18n';

import { DocumentTable } from './DocumentTable';
import { SearchForm } from './SearchForm';

type SearchProps = {
  params: {
    locale: Locale;
  };
  searchParams: {
    search?: string;
  };
};

const Search = async ({ params: { locale }, searchParams: { search } }: SearchProps) => {
  if (!isSupportedLocale(locale)) return;

  const localApi = await getLocalApi();

  const dict = await getDictionary(locale);

  let groupData: GroupData[] = [];
  if (search)
    groupData = await groupDataByLastName({
      lastNames: await searchLastNames({ localApi, locale, lastName: search }),
    });

  return (
    <PageGutter>
      <Gutter>
        <div className="mb-20 grid grid-cols-1 place-content-between gap-6 xl:grid-cols-[2fr_1fr]">
          <div>
            <Text size="h1" className="mb-3">
              {dict.search.content.title}
            </Text>
            <Text>{dict.search.content.description}</Text>
          </div>

          <Link
            href="/search-instruction"
            className="h-max w-max rounded-full border border-mallard px-5 py-4 text-mallard"
          >
            {dict.search.content.linkText}
          </Link>
        </div>

        <SearchForm labelInput={dict.search.form.label} textButton={dict.search.form.submit} defaultValue={search} />

        {groupData.length
          ? groupData.map((item) => (
              <div key={item.title} className="mb-12">
                <Text size="h2" className="mb-4 pl-5">
                  {item.title}
                </Text>

                <DocumentTable data={item.data} dict={dict} />
              </div>
            ))
          : search && (
              <div className="text-center">
                <Text size="h3" className="mb-3">
                  {dict.search.notFound.title}
                </Text>
                <Text size="h3">{dict.search.notFound.description}</Text>
              </div>
            )}
      </Gutter>
    </PageGutter>
  );
};

export default Search;
