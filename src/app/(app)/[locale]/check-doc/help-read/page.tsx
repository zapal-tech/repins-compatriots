import { notFound } from 'next/navigation';

import { jwtDecode } from '@app/utils/jwt';

import { Gutter } from '@app/components/Gutter';
import { PageGutter } from '@app/components/PageGutter';

import { getDictionary } from '@app/i18n';

import { Locale } from '@shared/i18n';

import { FormSendEmail } from './FormSendEmail';

type HelpReadProps = {
  params: {
    locale: Locale;
  };
  searchParams: {
    token: string;
  };
};

const HelpRead = async ({ params: { locale }, searchParams: { token } }: HelpReadProps) => {
  if (!token) return notFound();

  const decode = jwtDecode({ token });
  let lastNamesId: string | number = '';

  const dateNow = Number(
    Date.now()
      .toString()
      .substring(0, Date.now().toString().length - 3),
  );
  if (!decode || dateNow > decode?.exp) return notFound();

  if (typeof decode.data !== 'object') lastNamesId = Number(decode.data);

  const dict = await getDictionary(locale);

  return (
    <PageGutter>
      <Gutter>
        <FormSendEmail lastNamesId={lastNamesId} dictionary={dict.checkDoc.form} />
      </Gutter>
    </PageGutter>
  );
};

export default HelpRead;
