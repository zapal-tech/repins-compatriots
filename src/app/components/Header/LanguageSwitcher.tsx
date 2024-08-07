'use client';

import { usePathname, useRouter } from 'next/navigation';

import { defaultLocale, Locale } from '@shared/i18n';

import { LanguageSwitcherButton } from './LanguageSwitcherButton';

const localeLabels: Record<Locale, string> = {
  [Locale.Ukrainian]: 'Укр',
  [Locale.English]: 'Eng',
};

export const LanguageSwitcher: React.FC<{ activeLocale?: Locale }> = ({ activeLocale }) => {
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (locale: string) => {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    const expires = date.toUTCString();

    document.cookie = `LOCALE=${locale};expires=${expires};path=/`;

    if (activeLocale === defaultLocale) {
      router.push('/' + locale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${activeLocale}`, `/${locale}`));
    }

    router.refresh();
  };

  return (
    <ul className="group flex gap-4 pb-4 xl:order-none xl:mt-0 xl:pb-0">
      <li>
        <LanguageSwitcherButton
          onClick={() => handleChange(Locale.Ukrainian)}
          active={activeLocale === Locale.Ukrainian}
          button
        >
          {localeLabels[Locale.Ukrainian]}
        </LanguageSwitcherButton>
      </li>

      <li>
        <LanguageSwitcherButton
          onClick={() => handleChange(Locale.English)}
          active={activeLocale === Locale.English}
          button
        >
          {localeLabels[Locale.English]}
        </LanguageSwitcherButton>
      </li>
    </ul>
  );
};
