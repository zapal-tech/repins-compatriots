import { Metadata } from 'next';
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
      <Gutter className="mt-6 xl:mt-12">
        <div className="mb-20 grid grid-cols-1 place-content-between gap-6 xl:grid-cols-[2fr_1fr]">
          <div>
            <Text size="h1" className="mb-3">
              {dict.search.content.title}
            </Text>
            <Text>{dict.search.content.description}</Text>
          </div>

          <div className="flex justify-end">
            <Link
              href="/search-instruction"
              className="flex h-max w-max items-center gap-4 rounded-full border border-mallard px-5 py-4 text-mallard"
            >
              {dict.search.content.linkText}

              <svg width="22" height="19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M.333 9.451c0-.309.12-.606.335-.825.214-.218.505-.341.808-.341h16.211l-6.336-6.16A1.18 1.18 0 0 1 11.345.5c.206-.219.487-.347.784-.357.297-.01.587.098.807.302l8.381 8.166a1.168 1.168 0 0 1 .35.84 1.187 1.187 0 0 1-.35.84l-8.381 8.167a1.143 1.143 0 0 1-.822.35 1.122 1.122 0 0 1-.819-.357 1.169 1.169 0 0 1-.318-.848 1.185 1.185 0 0 1 .374-.825l6.336-6.16H1.477c-.304 0-.595-.123-.809-.342a1.179 1.179 0 0 1-.335-.825Z"
                  className="fill-mallard"
                />
              </svg>
            </Link>
          </div>
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

export const generateMetadata = async ({ params: { locale } }: SearchProps): Promise<Metadata> => {
  return {
    title: locale === Locale.English ? "Search | Repin's Compatriots" : 'Пошук | Земляки Рєпіна',
  };
};

export default Search;
