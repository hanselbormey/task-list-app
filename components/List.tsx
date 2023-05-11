import { Task } from '@/types/task';
import ListItem from './ListItem';
import Disclosure from './Disclosure';
import { Action } from '@/types/enums';

export default function List({ data }: { data: Task[] }) {
  return (
    <ul className="p-0.5">
      {data?.map((item) => (
        <li role="list-item" key={item.id}>
          <Disclosure
            formAction={Action.SAVE}
            disabledActionButtons={false}
            onSubmit={() => {}}
          >
            <ListItem key={item.id} item={item} />
          </Disclosure>
        </li>
      ))}
    </ul>
  );
}
