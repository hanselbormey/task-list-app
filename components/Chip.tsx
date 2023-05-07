import React from 'react';
import cn from 'classnames';

type ChipProps = {
  children: JSX.Element | string;
  className?: string;
};

const Chip: React.FC<ChipProps> = ({ children, className }) => {
  return (
    <span
      className={cn(
        'px-1  rounded-full font-medium text-sm flex items-center align-center w-max m-0.5',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Chip;
