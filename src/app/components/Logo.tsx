type Props = {
  // type?: 'icon' | 'text';
  className?: string;
  fill?: string;
};

export const Logo: React.FC<Props> = ({ className, fill = '#000' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="" fill="none" className={className}>
    <path fill={fill} d="" />
  </svg>
);
