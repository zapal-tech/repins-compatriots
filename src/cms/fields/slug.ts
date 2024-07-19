import type { Field } from 'payload';

import formatSlug from '@cms/utils/formatSlug';

import { deepMerge } from '@shared/utils';

type Slug = (overrides?: Partial<Field>, fieldToUseForAutoGeneration?: string) => Field;

export const slug: Slug = (overrides = {}, fieldToUseForAutoGeneration = 'title') =>
  deepMerge<Field, Partial<Field>>(
    {
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug(fieldToUseForAutoGeneration)],
      },
      index: true,
      label: 'URL Slug',
      name: 'slug',
      type: 'text',
    },
    overrides,
  );
