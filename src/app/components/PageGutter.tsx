type PageGutterProps = {
  children: React.ReactNode;
};

export const PageGutter: React.FC<PageGutterProps> = ({ children }) => (
  <div className="xl:pb-18 pb-10 pt-14 lg:pb-14 lg:pt-20 xl:pt-28">{children}</div>
);
