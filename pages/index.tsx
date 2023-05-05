import Input from '@/components/Input';
import { useEffect, useState } from 'react';

import List from '@/components/List';
import Disclosure from '@/components/Disclosure';
import { DataList } from '@/utils/mockData';

export default function Home() {
  const [value, setValue] = useState<string>('');
  const [initialValue, setInitialValue] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [disabledButtons, setDisabledButtons] = useState<boolean>(true);

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

  return (
    <div className="mt-4">
      <h1 className="text-3xl text-blue-500">Task List App</h1>
      <main className="mt-16">
        <Disclosure
          formAction={action}
          disabledButtons={disabledButtons}
          onSubmit={(e: string) => alert(e)}
          onCancel={() => setValue('')}
        >
          <Input value={value} onChange={(val) => setValue(val)} />
        </Disclosure>
        <div className="ml-4">
          <List data={DataList} />
        </div>
      </main>
    </div>
  );
}
