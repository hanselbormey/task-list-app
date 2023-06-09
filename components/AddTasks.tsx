import { useEffect, useState } from 'react';
import { PlusSquare } from 'react-feather';

import Disclosure from '@/components/Disclosure';
import Input from '@/components/Input';
import { Action } from '@/types/enums';
import { getCurrentFormAction } from '@/utils/index';

const AddTasks = ({ onAdd }: { onAdd(item: string): void }) => {
  const [value, setValue] = useState<string>('');
  const [initialValue, setInitialValue] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [disabledButtons, setDisabledButtons] = useState<boolean>(true);

  useEffect(() => {
    value ? setDisabledButtons(false) : setDisabledButtons(true);
    const act = getCurrentFormAction(initialValue, value);
    setAction(act);
  }, [value]);

  useEffect(() => {
    setInitialValue(value);
  }, []);

  const handleSubmit = (act: string) => {
    if (act === Action.ADD) {
      onAdd(value);
    }
    if (act === Action.OK) {
      onAdd('New task to do');
    }
    setValue('');
  };
  return (
    <div role="add-task">
      <Disclosure
        formAction={action}
        disabledActionButtons={disabledButtons}
        onSubmit={handleSubmit}
        onCancel={() => setValue('')}
      >
        <>
          <PlusSquare className="text-blue-500 w-4 h-4 md:w-6 md:h-6 mr-2 flex flex-shrink-0" />
          <Input
            id="addInput"
            value={value}
            onChange={(val) => setValue(val)}
          />
        </>
      </Disclosure>
    </div>
  );
};

export default AddTasks;
