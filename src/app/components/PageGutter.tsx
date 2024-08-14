type PageGutterProps = {
  children: React.ReactNode;
};

export const PageGutter: React.FC<PageGutterProps> = ({ children }) => (
  <div className="pb-28 pt-14 lg:pb-32 xl:pb-40 xl:pt-24">{children}</div>
);
