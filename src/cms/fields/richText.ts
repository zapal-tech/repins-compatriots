import { RichTextField, RichTextFieldProps } from 'payload';

import { deepMerge } from '@shared/utils';

export const richText = ({ name, ...overrides }: RichTextFieldProps<{}, any>): RichTextField =>
  deepMerge(
    {
      name,
      type: 'richText',
      label: { en: 'Text', uk: 'Текст' },
    },
    overrides,
  );
