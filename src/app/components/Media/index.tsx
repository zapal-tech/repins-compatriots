import { Fragment } from 'react';

import { Image } from './Image';
import type { Props } from './types';
import { Video } from './Video';

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props;

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video');
  const Tag = htmlElement || Fragment;

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <Video {...props} /> : <Image alt={props.alt || ''} {...props} />}
    </Tag>
  );
};
