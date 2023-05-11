import { useState } from 'react';

import List from '@/components/List';
import { DataList } from '@/utils/mockData';
import { Task } from '@/types/task';
import AddTasks from '@/components/AddTasks';

export default function Home() {
  const [dataList, setDataList] = useState<Task[]>(DataList);

  const addItem = (value: string) => {
    const arr: Task[] = [...dataList];
    arr.unshift({ id: Math.random().toString(), body: value });
    setDataList(arr);
  };

  return (
    <div className="md:mt-4">
      <h1 className="text-3xl font-semibold text-blue-500">Task List App</h1>
      <main className="mt-8 md:mt-16">
        <AddTasks onAdd={addItem} />
        <div className="ml-0.5 mt-3">
          <List data={dataList} />
        </div>
      </main>
    </div>
  );
}
