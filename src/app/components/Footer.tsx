import Link from 'next/link';

import { getLocalApi } from '@app/utils/localApi';

import { Text } from '@app/components/Text';

import { Global } from '@cms/types';
import { Footer as FooterType, Settings } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

import { CMSLink } from './CMSLink';
import { Gutter } from './Gutter';

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
    <footer className="mt-auto w-full py-12 xl:pb-4">
      <Gutter>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          <div>Logo</div>
          <div>
            <Text className="pb-5 font-bold text-gray-800" size="3xl">
              Navigate:
            </Text>
            <div className="col-span-full flex flex-col gap-5">
              {(footer.navigation || []).map(({ link, id }) => (
                <Text className="text-gray-800" size="sm" key={id}>
                  <CMSLink {...link} />
                </Text>
              ))}
            </div>
          </div>

          <div>
            <Text className="pb-5 font-bold text-gray-800" size="3xl">
              Contacts:
            </Text>
            <div className="col-span-full flex flex-col gap-5">
              {settings.email && (
                <Link href={`mailto:${settings.email}`}>
                  <Text className="text-gray-800" size="sm">
                    {settings.email}
                  </Text>
                </Link>
              )}

              {settings.phone && (
                <Link href={`tel:${settings.phone}`}>
                  <Text className="text-gray-800" size="sm">
                    {settings.phone}
                  </Text>
                </Link>
              )}
            </div>
          </div>

          <div>
            <Text className="pb-5 font-bold text-gray-800" size="3xl">
              Social
            </Text>
            <div className="col-span-full flex flex-col gap-5">
              {settings.viberUrl && (
                <Link className="flex gap-px" href={settings.viberUrl}>
                  <div></div>
                  <Text className="text-gray-800" size="sm">
                    Viber
                  </Text>
                </Link>
              )}

              {settings.whatsappUrl && (
                <Link className="flex gap-px" href={settings.whatsappUrl}>
                  <div></div>
                  <Text className="text-gray-800" size="sm">
                    Whatsapp
                  </Text>
                </Link>
              )}

              {settings.instagramUrl && (
                <Link className="flex gap-px" href={settings.instagramUrl}>
                  <div></div>
                  <Text className="text-gray-800" size="sm">
                    Instagram
                  </Text>
                </Link>
              )}

              {settings.facebookUrl && (
                <Link className="flex gap-px" href={settings.facebookUrl}>
                  <div></div>
                  <Text className="text-gray-800" size="sm">
                    Facebook
                  </Text>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Gutter>
    </footer>
  );
};
