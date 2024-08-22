import { RichTextField } from 'payload';

import { deepMerge } from '@shared/utils';

export const richText = ({ name, ...overrides }: Omit<RichTextField<{}, any>, 'type'>): RichTextField =>
  deepMerge(
    {
      name,
      type: 'richText',
      label: { en: 'Text', uk: 'Текст' },
    },
    overrides,
  );
