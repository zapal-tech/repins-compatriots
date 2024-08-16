import { CSSProperties } from 'react';
import clsx from 'clsx';
import NextImage, { type StaticImageData } from 'next/image';

import { breakpoints } from '@shared/breakpoints';

import type { Props as MediaProps } from './types';

export const Image: React.FC<MediaProps & { style?: CSSProperties }> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    src: srcFromProps,
    style,
  } = props;

  let width: number | undefined;
  let height: number | undefined;
  let alt = altFromProps;
  let src: StaticImageData | string = srcFromProps || '';

  if (!src && resource && typeof resource === 'object') {
    const { url, height: fullHeight, width: fullWidth } = resource;

    width = fullWidth ? fullWidth : undefined;
    height = fullHeight ? fullHeight : undefined;

    src = url!;
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = Object.entries(breakpoints)
    .map(([, value]) => `(max-width: ${value}px) ${value}px`)
    .join(', ');

  return (
    <NextImage
      alt={alt || ''}
      className={clsx(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      onClick={onClick}
      onLoad={onLoadFromProps}
      priority={priority}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
      unoptimized
      style={style}
    />
  );
};
