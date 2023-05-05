import React from 'react';
import cn from 'classnames';

type ChipProps = {
  children: JSX.Element | string;
  classname: string;
};

const Chip: React.FC<ChipProps> = ({ children, classname }) => {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded-full font-medium text-sm flex items-center align-center w-max m-0.5',
        classname
      )}
    >
      {children}
    </span>
  );
};

export default Chip;
