import { Task } from '@/types/task';
import ListItem from './ListItem';

export default function List({ data }: { data: Task[] }) {
  return (
    <div className="p-0.5">
      {data?.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
