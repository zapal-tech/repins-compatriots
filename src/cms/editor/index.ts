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

import { columnsBlock } from './blocks/columns';

export const baseHeadingFeature = HeadingFeature({
  enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5'],
});

const linkFields = link({ appearances: ['default', 'primary', 'secondary'] }).fields.map((field) => {
  if (field.type === 'row') {
    field.fields.forEach((subField) => {
      if ((subField as any).name === 'label') {
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
    fields: () => linkFields,
  }),
  // @ts-ignore
  UploadFeature(),
  InlineToolbarFeature(),
];

export const editor = lexicalEditor({
  features: [...baseEditorFeatures, baseHeadingFeature, BlocksFeature({ blocks: [columnsBlock] })],
}) as unknown as RichTextAdapterProvider<{}, any, any>;

export const heroEditor = lexicalEditor({
  features: [...baseEditorFeatures, HeadingFeature()],
}) as unknown as RichTextAdapterProvider<{}, any, any>;
