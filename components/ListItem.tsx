import { useState } from 'react';
import cn from 'classnames';

import Input from './Input';
import { Task } from '@/types/task';
import Chip from './Chip';
import IconTag from './IconTag';
import { getBgColor, getTag, getTextColor } from '../utils';

const StyledText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split(' ').map((e, index) => {
        const tag = getTag(e);
        if (tag) {
          const textColor = getTextColor(tag);
          const bgColor = getBgColor(tag);
          return (
            <Chip key={index} className={cn(bgColor, textColor, 'py-0.5')}>
              <IconTag tag={tag} label={e} />
            </Chip>
          );
        }
        return <span key={index}>{e}&nbsp;</span>;
      })}
    </>
  );
};

const ListItem = ({ item }: { item: Task }) => {
  const [value, setValue] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'flex items-center w-full',
        `${!open ? 'flex-wrap' : 'flex-nowrap'}`
      )}
      onClick={() => setOpen(!open)}
    >
      <input type="checkbox" className="rounded-sm mr-2" />
      {!open ? (
        <StyledText text={item.body} />
      ) : (
        <Input id={item.id} value={item.body} onChange={(e) => setValue(e)} />
      )}
    </div>
  );
};

export default ListItem;
