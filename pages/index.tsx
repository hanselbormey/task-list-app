import { useEffect, useState } from 'react';

import Input from '@/components/Input';
import List from '@/components/List';
import Disclosure from '@/components/Disclosure';
import { DataList } from '@/utils/mockData';
import { Task } from '@/types/task';
import { Action } from '@/types/enums';

export default function Home() {
  const [value, setValue] = useState<string>('');
  const [initialValue, setInitialValue] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [disabledButtons, setDisabledButtons] = useState<boolean>(true);

  const [dataList, setDataList] = useState<Task[]>(DataList);

  useEffect(() => {
    value ? setDisabledButtons(false) : setDisabledButtons(true);
    const act = getCurrentFormAction();
    setAction(act);
  }, [value]);

  useEffect(() => {
    setInitialValue(value);
  }, []);

  const getCurrentFormAction = () => {
    let result = 'save';
    if (initialValue === value || value === '') result = 'ok';
    if (!initialValue && value) result = 'add';
    return result;
  };

  const addItem = (value: string) => {
    const arr: Task[] = [...dataList];
    arr.unshift({ id: Math.random().toString(), body: value });
    setValue('');
    setDataList(arr);
  };

  const handleSubmit = (act: string) => {
    if (act === Action.ADD) {
      addItem(value);
    }
    if (act === Action.OK) {
      addItem('New task to do');
    }
  };

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-semibold text-blue-500">Task List App</h1>
      <main className="mt-16">
        <Disclosure
          formAction={action}
          disabledActionButtons={disabledButtons}
          onSubmit={handleSubmit}
          onCancel={() => setValue('')}
        >
          <Input value={value} onChange={(val) => setValue(val)} />
        </Disclosure>
        <div className="ml-4">
          <List data={dataList} />
        </div>
      </main>
    </div>
  );
}
