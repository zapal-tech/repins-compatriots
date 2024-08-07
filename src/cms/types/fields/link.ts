import { GroupField, TextField } from 'payload';

import { ButtonProps } from '@app/components/Button';

import { Collection } from '@cms/types';
import { Page } from '@cms/types/generated-types';

export enum LinkType {
  Internal = 'internal',
  Custom = 'custom',
}

export type LinkAppearance = Required<ButtonProps>['style'] | 'default';

export type LinkAppearanceOption = {
  label: string | Record<string, string>;
  value: LinkAppearance;
};

export type LinkOverrides = Omit<Partial<TextField>, 'type'>;

export type LinkField = (
  options?: {
    appearances?: LinkAppearance[] | false;
    disableLabel?: boolean;
  } & LinkOverrides,
) => GroupField;

export type LinkData = {
  appearance?: LinkAppearance;
  arrow?: boolean;
  newTab?: boolean;
  noFollow?: boolean;
  text?: string | null;
  doc?: {
    relationTo: Collection | string;
    value: Page | number;
  } | null;
  linkType?: LinkType | string;
  url?: string | null;
  // locale?: Locale | string;
};
