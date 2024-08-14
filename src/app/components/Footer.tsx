import Link from 'next/link';

import { getLocalApi } from '@app/utils/localApi';

import { Text } from '@app/components/Text';

import { getDictionary } from '@app/i18n';

import { Global } from '@cms/types';
import { Footer as FooterType, Settings } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

import { CMSLink } from './CMSLink';
import { GridWithGutter } from './GridWithGutter';
import { Icon } from './Icon';
import { Logo } from './Logo';

export type FooterProps = {
  locale: Locale;
};

export const Footer: React.FC<FooterProps> = async ({ locale }) => {
  const localApi = await getLocalApi();
  const dict = await getDictionary(locale);

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
    <footer className="mt-auto w-full pb-8 xl:pb-14">
      <GridWithGutter gridClassName="h-max gap-6 sm:grid-cols-2 md:grid-cols-8">
        <div className="grid place-items-center md:col-span-2 xl:col-span-3">
          <Logo fill="#1C3516" className="w-2/3" />
        </div>

        <div className="gap-5 md:col-span-2 xl:col-span-3">
          <Text tag="h2" className="mb-6">
            {dict.footer.navigation}
          </Text>

          <ul className="col-span-full flex flex-col gap-5">
            {(footer.navigation || []).map(({ link, id }) => (
              <li key={id}>
                <Text size="sm">
                  <CMSLink {...link} />
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <div className="gap-5 md:col-span-2 xl:col-span-3">
          <Text tag="h2" className="mb-6">
            {dict.footer.contacts}
          </Text>

          <ul className="col-span-full flex flex-col gap-5">
            {settings.email && (
              <li>
                <Link href={`mailto:${settings.email}`}>
                  <Text size="sm">{settings.email}</Text>
                </Link>
              </li>
            )}

            {settings.phone && (
              <li>
                <Link href={`tel:${settings.phone}`}>
                  <Text size="sm">{settings.phone}</Text>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="gap-5 md:col-span-2 xl:col-span-3">
          <Text tag="h2" className="mb-6">
            {dict.footer.messengers}
          </Text>

          <ul className="col-span-full flex flex-col gap-5">
            {settings.viberUrl && (
              <li>
                <Link className="flex items-center gap-2" href={settings.viberUrl}>
                  <Icon type="Viber" />
                  <Text size="sm">Viber</Text>
                </Link>
              </li>
            )}

            {settings.whatsappUrl && (
              <li>
                <Link className="flex items-center gap-2" href={settings.whatsappUrl}>
                  <Icon type="Whatsapp" />
                  <Text size="sm">Whatsapp</Text>
                </Link>
              </li>
            )}

            {settings.instagramUrl && (
              <li>
                <Link className="flex items-center gap-2" href={settings.instagramUrl}>
                  <Icon type="Instagram" />
                  <Text size="sm">Instagram</Text>
                </Link>
              </li>
            )}

            {settings.facebookUrl && (
              <li>
                <Link className="flex items-center gap-2" href={settings.facebookUrl}>
                  <Icon type="Facebook" />
                  <Text size="sm">Facebook</Text>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </GridWithGutter>
    </footer>
  );
};
