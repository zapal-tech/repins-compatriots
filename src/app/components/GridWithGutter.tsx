import { Grid } from './Grid';
import { Gutter } from './Gutter';

type Props = {
  gridTag?: React.ElementType;
  gridClassName?: string;
  gutterTag?: React.ElementType;
  gutterClassName?: string;
  children: React.ReactNode;
};

export const GridWithGutter: React.FC<Props> = ({ gridTag, gridClassName, gutterTag, gutterClassName, children }) => (
  <Gutter tag={gridTag} className={gutterClassName}>
    <Grid tag={gutterTag} className={gridClassName}>
      {children}
    </Grid>
  </Gutter>
);
