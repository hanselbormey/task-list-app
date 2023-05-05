import cn from 'classnames';

import { Task } from '@/types/task';
import { getBgColor, getTag, getTextColor } from '../utils';
import Chip from './Chip';

const ListItem = ({ item }: { item: Task }) => {
  return (
    <div className="flex items-center">
      <input type="checkbox" className="rounded-sm mr-2" />
      {item.body.split(' ').map((e, index) => {
        const tag = getTag(e);
        if (tag) {
          const textColor = getTextColor(tag);
          const bgColor = getBgColor(tag);
          return (
            <Chip key={index} classname={cn(bgColor, textColor)} label={e} />
          );
        }
        return <span key={index}>{e}&nbsp;</span>;
      })}
    </div>
  );
};

export default ListItem;
