import { MessageScreen, MessageScreenButtonProps } from '@app/components/MessageScreen';
import { PageGutter } from '@app/components/PageGutter';

const NotFound = async () => (
  <PageGutter>
    <MessageScreen title="404" description="Сторінку не знайдено" />
  </PageGutter>
);

export default NotFound;
