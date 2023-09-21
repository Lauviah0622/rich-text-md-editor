import classes from './style.module.css';

export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className={classes.toolbar}>{children}</div>;
}
