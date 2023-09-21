import type { PropsWithChildren } from 'react';
import React from 'react';

import css from 'classnames';
import classes from './style.module.css';

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

export const Button = ({
  className,
  active = false,
  ...props
}: PropsWithChildren<
  {
    active?: boolean;
  } & BaseProps
>) => (
  <button
    {...props}
    className={css(className, classes.button, active && classes.active)}
  />
);

export const Icon = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>) => (
    <span
      {...props}
      style={{
        fontSize: '18px',
        verticalAlign: 'text-bottom',
      }}
      className={css('material-icons', className)}
    />
  )
);
