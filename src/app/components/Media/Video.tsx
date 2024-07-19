'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';

import type { Props as MediaProps } from './types';

export const Video: React.FC<MediaProps> = ({ onClick, resource, videoClassName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef;

    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);

  if (resource && typeof resource === 'object') {
    const { filename } = resource;

    return (
      <video
        autoPlay
        className={clsx(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={`${process.env.NEXT_PUBLIC_SITE_URL}/media/${filename}`} />
      </video>
    );
  }

  return null;
};
