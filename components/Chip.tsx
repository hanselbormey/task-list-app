import React from 'react';
import cn from 'classnames';

type ChipProps = {
  label: string;
  classname: string;
};

const Chip: React.FC<ChipProps> = ({ label, classname }) => {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded-full font-semibold text-sm flex align-center w-max m-0.5',
        classname
      )}
    >
      {label}
    </span>
  );
};

export default Chip;
