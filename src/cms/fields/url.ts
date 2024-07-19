import type { TextField } from 'payload';

import { validateUrl } from '@cms/utils/validators';

export const url = (data: Omit<Partial<TextField>, 'type'>): TextField =>
  ({
    label: {
      en: 'URL',
      uk: 'Посилання',
    },
    type: 'text',
    validate: validateUrl,
    required: false,
    ...data,
    admin: {
      placeholder: 'https://...',
      ...data?.admin,
    },
  }) as TextField;
