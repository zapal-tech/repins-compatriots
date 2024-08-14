import clsx from 'clsx';

type IconProps = {
  type: 'Instagram' | 'Facebook' | 'Whatsapp' | 'Viber';
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ type, className }) => {
  const urlImage = `${process.env.NEXT_PUBLIC_SITE_URL}/icons/${type}.svg`;

  return (
    <div
      className={clsx(className, 'h-[1.125rem] w-[1.125rem] bg-cover bg-center')}
      style={{
        backgroundImage: `url('${urlImage}')`,
      }}
    />
  );
};
