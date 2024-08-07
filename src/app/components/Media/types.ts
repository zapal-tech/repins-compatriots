import type { ElementType, Ref } from 'react';
import type { StaticImageData } from 'next/image';

import type { MediaDocument, Media as MediaType } from '@cms/types/generated-types';

export interface Props {
  alt?: string;
  className?: string;
  fill?: boolean; // for NextImage only
  htmlElement?: ElementType | null;
  imgClassName?: string;
  onClick?: () => void;
  onLoad?: () => void;
  priority?: boolean; // for NextImage only
  ref?: Ref<HTMLImageElement | HTMLVideoElement | null>;
  resource?: MediaType | MediaDocument | number | null; // for Payload media
  size?: string; // for NextImage only
  unoptimized?: boolean; // for NextImage only
  src?: StaticImageData; // for static media
  videoClassName?: string;
}
