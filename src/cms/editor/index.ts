import {
  AlignFeature,
  BlocksFeature,
  BoldFeature,
  FeatureProviderServer,
  HeadingFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical';
import { RichTextAdapterProvider } from 'payload';

import { link } from '@cms/fields/link';

import { Collection } from '@cms/types';
import { LinkAppearance } from '@cms/types/fields/link';

import { columnsBlock } from './blocks/columns';
import { partnersBlock } from './blocks/partners';

export const baseHeadingFeature = HeadingFeature({
  enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5'],
});

const linkFields = link({ appearances: ['default', 'primary', 'secondary'] }).fields.map((field) => {
  if (field.type === 'row') {
    field.fields.forEach((subField) => {
      if ((subField as any).name === 'text') {
        (subField as any).name = 'text';
        (subField as any).label = {
          en: 'Text to display',
          uk: 'Текст для відображення',
        };
      }

      return subField;
    });
  }

  return field;
});

export const baseEditorFeatures: FeatureProviderServer<any, any>[] = [
  ParagraphFeature(),
  AlignFeature(),
  BoldFeature(),
  ItalicFeature(),
  UnderlineFeature(),
  StrikethroughFeature(),
  InlineCodeFeature(),
  UnorderedListFeature(),
  OrderedListFeature(),
  SuperscriptFeature(),
  SubscriptFeature(),
  // @ts-ignore
  LinkFeature({
    enabledCollections: [Collection.Pages],
    fields: ({ defaultFields }) => [
      ...defaultFields,
      {
        name: 'appearance',
        label: {
          en: 'Appearance',
          uk: 'Вигляд',
        },
        type: 'select',
        defaultValue: 'default' as LinkAppearance,
        options: ['default', 'primary', 'secondary'],
        admin: {
          description: {
            en: 'Choose how the link should be rendered.',
            uk: 'Оберіть, як посилання має бути відображене.',
          },
        },
      },
      {
        name: 'arrow',
        type: 'checkbox',
        label: {
          en: 'Arrow',
          uk: 'Стрілка',
        },
      },
    ],
  }),
  // @ts-ignore
  UploadFeature(),
  InlineToolbarFeature(),
];

export const editor = lexicalEditor({
  features: [...baseEditorFeatures, baseHeadingFeature, BlocksFeature({ blocks: [columnsBlock, partnersBlock] })],
}) as unknown as RichTextAdapterProvider<{}, any, any>;

export const heroEditor = lexicalEditor({
  features: [...baseEditorFeatures, HeadingFeature()],
}) as unknown as RichTextAdapterProvider<{}, any, any>;
