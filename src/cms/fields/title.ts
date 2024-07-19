import { Field, TextField } from 'payload';

import { deepMerge } from '@shared/utils';

export const title = (data?: Partial<Omit<TextField, 'type'>>): Field =>
  deepMerge(
    {
      label: {
        en: 'Title',
        uk: 'Заголовок',
      },
      name: 'title',
      required: true,
      localized: true,
      type: 'text',
    },
    data,
  );
