import { defaultElements, PayloadLexicalReact, PayloadLexicalReactContent } from '@zapal/payload-lexical-react';

import { LinkData, LinkType } from '@cms/types/fields/link';
import { Media as MediaType } from '@cms/types/generated-types';

import { CMSLink } from './CMSLink';
import { Media } from './Media';
import { Text, TextProps } from './Text';

type LexicalRendererProps<Blocks> = {
  children: PayloadLexicalReactContent;
  blocks?: Blocks;
};

const getFormatting = (format?: string | number | null, dir?: string | null) => {
  let formatting: string = typeof format === 'string' ? format : '';

  if (['left', 'right'].includes(formatting)) {
    if (dir === 'ltr' || !dir) {
      if (formatting === 'left') formatting = 'start';
      if (formatting === 'right') formatting = 'end';
    }

    if (dir === 'rtl') {
      if (formatting === 'left') formatting = 'end';
      if (formatting === 'right') formatting = 'start';
    }
  }

  return formatting;
};

export const LexicalRenderer = <
  Blocks extends {
    [key: string]: any;
  },
>({
  children,
  blocks,
}: LexicalRendererProps<Blocks>) => (
  <PayloadLexicalReact<Blocks>
    content={children}
    elements={{
      ...defaultElements,
      listItem: ({ children, format, direction }) => {
        const formatting = getFormatting(format, direction);

        return <li className={`text-${formatting}`}>{children}</li>;
      },
      heading: ({ children, tag, direction, format }) => {
        const formatting = getFormatting(format, direction);

        return (
          <Text tag={tag as TextProps['tag']} {...{ [formatting]: true }}>
            {children}
          </Text>
        );
      },
      paragraph: ({ children, direction, format }) => {
        const formatting = getFormatting(format, direction);

        return <Text {...{ [formatting]: true }}>{children}</Text>;
      },
      link: ({ fields, children }) => (
        <CMSLink
          {...fields}
          linkType={fields.linkType}
          doc={fields.linkType === LinkType.Internal ? (fields.doc as LinkData['doc']) : undefined}
          url={fields.linkType === LinkType.Internal ? '' : fields.url}
        >
          {children}
        </CMSLink>
      ),
      autolink: ({ fields, children }) => <CMSLink {...(fields as any)}>{children}</CMSLink>,
      upload: ({ value }) => <Media resource={value as unknown as MediaType} unoptimized />,
    }}
    blocks={blocks}
  />
);
