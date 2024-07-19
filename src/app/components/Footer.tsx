import { getLocalApi } from '@app/utils/localApi';

import { Text } from '@app/components/Text';

import { Global } from '@cms/types';
import { Footer as FooterType, Settings } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

import { CMSLink } from './CMSLink';

export type FooterProps = {
  locale: Locale;
};

export const Footer: React.FC<FooterProps> = async ({ locale }) => {
  const localApi = await getLocalApi();

  let footer: FooterType | null = null;
  let settings: Settings | null = null;

  try {
    [footer, settings] = await Promise.all([
      localApi.findGlobal({ slug: Global.Footer, locale }),
      localApi.findGlobal({ slug: Global.Settings, locale }),
    ]);
  } catch (error) {
    localApi.logger.error(error);
  }

  if (!footer || !settings) return null;

  return (
    <footer className="mt-auto w-full bg-black py-12 text-white xl:pb-4">
      <ul className="col-span-full flex flex-col gap-5 xs:col-span-2 sm:col-span-3 md:col-span-2">
        {(footer.navigation || []).map(({ link, id }) => (
          <li key={id}>
            <Text tag="span">
              <CMSLink {...link} />
            </Text>
          </li>
        ))}
      </ul>
    </footer>
  );
};
