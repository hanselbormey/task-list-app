import cn from 'classnames';

import { Task } from '@/types/task';
import Chip from './Chip';
import IconTag from './IconTag';
import { getBgColor, getTag, getTextColor } from '../utils';

const ListItem = ({ item }: { item: Task }) => {
  return (
    <div className="flex items-center flex-wrap p-0.5">
      <input type="checkbox" className="rounded-sm mr-2" />
      {item.body.split(' ').map((e, index) => {
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
    </div>
  );
};

export default ListItem;
