import { Button, ButtonProps } from './Button';
import { Text } from './Text';

export type MessageScreenButtonProps = Omit<ButtonProps, 'children' | 'link'> & { label: string };

type MessageScreenProps = {
  title: string;
  description: string;
  buttons?: MessageScreenButtonProps[];
};

export const MessageScreen = ({ title, description, buttons }: MessageScreenProps) => (
  <div className="flex h-full flex-col items-center justify-center gap-10">
    <div className="flex flex-col items-center justify-center">
      <Text center tag="h1">
        {title}
      </Text>
      <Text center>{description}</Text>
    </div>

    {buttons && buttons.length > 0 && (
      <div className="flex flex-col gap-2 md:flex-row">
        {buttons.map(({ label, ...buttonProps }, index) => (
          <Button key={index} type="link" {...buttonProps}>
            {label}
          </Button>
        ))}
      </div>
    )}
  </div>
);
