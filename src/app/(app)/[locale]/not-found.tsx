import { MessageScreen, MessageScreenButtonProps } from '@app/components/MessageScreen';
import { PageGutter } from '@app/components/PageGutter';

import { getDictionary } from '@app/i18n';

import { Locale } from '@shared/i18n';

const NotFound = async ({ locale }: { locale: Locale }) => {
  const dict = await getDictionary(locale);

  return (
    <PageGutter>
      <MessageScreen title="404" description={dict.error.pageNotFound} />
    </PageGutter>
  );
};

export default NotFound;
