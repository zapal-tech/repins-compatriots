import Link from 'next/link';

import { getLocalApi } from '@app/utils/localApi';

import { mobileMenuId } from '@app/constants';

import { Global } from '@cms/types';
import { Header as HeaderType, Settings } from '@cms/types/generated-types';

import { Locale } from '@shared/i18n';

import { CMSLink } from '../CMSLink';
import { Gutter } from '../Gutter';
import { Icon } from '../Icon';
import { Logo } from '../Logo';
import { Text } from '../Text';

import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenuButton } from './MobileMenuButton';

type HeaderProps = {
  locale: Locale;
};

export const Header: React.FC<HeaderProps> = async ({ locale }) => {
  const localApi = await getLocalApi();
  // const dict = await getDictionary(locale);

  let header: HeaderType | null = null;
  let settings: Settings | null = null;

  try {
    [header, settings] = await Promise.all([
      localApi.findGlobal({ slug: Global.Header, locale }),
      localApi.findGlobal({ slug: Global.Settings, locale }),
    ]);
  } catch (error) {
    localApi.logger.error(error);
  }

  if (!header || !settings) return null;

  return (
    <header className="fixed z-10 h-12 w-full border-b border-mallard bg-white-orchid xl:h-20">
      <Gutter className="flex h-full items-center justify-between gap-11 xl:justify-start">
        <Link href="/" className="h-3/4 xl:h-2/3">
          <Logo fill="#1C3516" className="h-full" type="icon" />
        </Link>

        <MobileMenuButton />

        <nav
          className="fixed left-full top-12 flex h-[calc(100lvh-3rem)] w-full flex-col justify-between gap-y-7
            bg-white-orchid px-4 py-7 opacity-0 transition-all duration-300 xl:static xl:left-auto xl:top-auto xl:flex
            xl:h-auto xl:w-full xl:flex-row xl:p-0 xl:opacity-100"
          id={mobileMenuId}
        >
          <ul className="flex flex-col gap-x-8 gap-y-4 xl:flex-row">
            {header.navItems.map(({ id, link }) => (
              <li key={id}>
                <Text className="transition-colors hover:text-mallard">
                  <CMSLink {...link} />
                </Text>
              </li>
            ))}
          </ul>

          <LanguageSwitcher activeLocale={locale} />

          <ul className="flex flex-col gap-y-4 xl:hidden">
            {settings.viberUrl && (
              <li>
                <Link href={settings.viberUrl} className="flex items-center gap-2">
                  <Icon className="!h-5 !w-5" type="Viber" />
                  <Text className="transition-colors hover:text-mallard">Viber</Text>
                </Link>
              </li>
            )}
            {settings.whatsappUrl && (
              <li>
                <Link href={settings.whatsappUrl} className="flex items-center gap-2">
                  <Icon className="!h-5 !w-5" type="Whatsapp" />
                  <Text className="transition-colors hover:text-mallard">WhatsApp</Text>
                </Link>
              </li>
            )}
            {settings.instagramUrl && (
              <li>
                <Link href={settings.instagramUrl} className="flex items-center gap-2">
                  <Icon className="!h-5 !w-5" type="Instagram" />
                  <Text className="transition-colors hover:text-mallard">Instagram</Text>
                </Link>
              </li>
            )}
            {settings.facebookUrl && (
              <li>
                <Link href={settings.facebookUrl} className="flex items-center gap-2">
                  <Icon className="!h-5 !w-5" type="Facebook" />
                  <Text className="transition-colors hover:text-mallard">Facebook</Text>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </Gutter>
    </header>
  );
};
