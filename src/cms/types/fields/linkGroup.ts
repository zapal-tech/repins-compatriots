import { ArrayField, Field } from 'payload';

import { LinkAppearance, LinkOverrides } from './link';

export type LinkGroupField = (
  options?: Partial<ArrayField> & { appearances?: LinkAppearance[] | false; linkOverrides?: LinkOverrides },
) => Field;
