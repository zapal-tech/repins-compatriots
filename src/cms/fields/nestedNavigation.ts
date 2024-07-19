import type { ArrayField } from 'payload';

import { link } from './link';

type NestedNavigationProps = {
  depth?: number;
  isTopLevel?: boolean;
  required?: boolean;
  name?: string;
};

export const nestedNavigation = ({
  depth = 1,
  isTopLevel = true,
  name = 'navItems',
  required = false,
}: NestedNavigationProps): ArrayField => {
  const nestedNavigationField: ArrayField = {
    labels: {
      plural: {
        en: 'Navigation',
        uk: 'Навігація',
      },
      singular: {
        en: 'Navigation item',
        uk: 'Пункт навігації',
      },
    },
    name,
    type: 'array',
    fields: [link({ appearances: false })],
    maxRows: isTopLevel ? 6 : 8,
    localized: isTopLevel ? true : undefined,
    required,
    admin:
      depth > 0 && !isTopLevel
        ? {
            condition: (_, siblingData) => siblingData?.isNestedNavigation,
          }
        : undefined,
  };

  if (depth > 1) {
    nestedNavigationField.fields = [
      ...nestedNavigationField.fields,
      {
        label: {
          en: 'Nested navigation',
          uk: 'Вкладена навігація',
        },
        name: 'isNestedNavigation',
        type: 'checkbox',
        defaultValue: false,
        required: true,
      },
      nestedNavigation({ depth: depth - 1, isTopLevel: false }),
    ];
  }

  return nestedNavigationField;
};
