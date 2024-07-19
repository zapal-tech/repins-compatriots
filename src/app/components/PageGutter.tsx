type PageGutterProps = {
  children: React.ReactNode;
};

export const PageGutter: React.FC<PageGutterProps> = ({ children }) => (
  <div className="pt-15 xl:pb-18 pb-10 lg:pb-14 lg:pt-20 xl:pt-28">{children}</div>
);
