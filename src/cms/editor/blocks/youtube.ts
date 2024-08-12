import { Block } from 'payload';

export const youtubeBlock: Block = {
  labels: {
    singular: {
      en: 'YouTube',
      uk: 'YouTube',
    },
    plural: {
      en: 'YouTube',
      uk: 'YouTube',
    },
  },
  slug: 'youtube',
  fields: [
    {
      name: 'youtubeId',
      type: 'text',
      label: {
        en: 'YouTube Video ID',
        uk: 'ID відео на YouTube',
      },
      required: true,
      admin: {
        placeholder: 'dQw4w9WgXcQ',
      },
    },
  ],
};
