import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Disclosure from '@/components/Disclosure';
import Input from '@/components/Input';
import { getCurrentFormAction } from '../utils';
import AddTasks from '@/components/AddTasks';
import List from '@/components/List';
import { Task } from '@/types/task';
import { DataList } from '@/utils/mockData';

afterEach(cleanup);

describe('Home', () => {
  it('click on disclosure should open the toolbar', async () => {
    render(
      <Disclosure
        disabledActionButtons
        formAction={getCurrentFormAction('', '')}
        onSubmit={() => {}}
        onCancel={() => {}}
      >
        <Input value="" onChange={() => {}} />
      </Disclosure>
    );

    userEvent.click(screen.getByRole('open-disclosure'));

    expect(await screen.findByRole('toolbar')).not.toBeNull();
  });

  it('toolbar buttons should be disabled if there is no input value', async () => {
    render(
      <Disclosure
        disabledActionButtons
        formAction={getCurrentFormAction('', '')}
        onSubmit={() => {}}
        onCancel={() => {}}
      >
        <Input value="" onChange={() => {}} />
      </Disclosure>
    );

    userEvent.click(screen.getByRole('open-disclosure'));

    const openBtn = await screen.findByRole('button', { name: /Open/ });
    const todayBtn = await screen.findByRole('button', { name: /Today/ });
    const publicBtn = await screen.findByRole('button', { name: /Public/ });
    const highlightBtn = await screen.findByRole('button', {
      name: /Highlight/,
    });
    const estimateBtn = await screen.findByRole('button', { name: /Estimate/ });
    const deleteBtn = await screen.findByRole('button', { name: /Delete/ });

    expect(openBtn).toBeDisabled();
    expect(todayBtn).toBeDisabled();
    expect(publicBtn).toBeDisabled();
    expect(highlightBtn).toBeDisabled();
    expect(estimateBtn).toBeDisabled();
    expect(deleteBtn).toBeDisabled();
  });

  it('toolbar buttons should be enabled if you type something', async () => {
    render(<AddTasks onAdd={() => {}} />);

    userEvent.click(screen.getByRole('open-disclosure'));

    fireEvent.input(await screen.findByRole('input'), {
      target: { textContent: 'text' },
    });

    const openBtn = await screen.findByRole('button', { name: /Open/ });
    const todayBtn = await screen.findByRole('button', { name: /Today/ });
    const publicBtn = await screen.findByRole('button', { name: /Public/ });
    const highlightBtn = await screen.findByRole('button', {
      name: /Highlight/,
    });
    const estimateBtn = await screen.findByRole('button', { name: /Estimate/ });
    const deleteBtn = await screen.findByRole('button', { name: /Delete/ });

    expect(openBtn).toBeEnabled();
    expect(todayBtn).toBeEnabled();
    expect(publicBtn).toBeEnabled();
    expect(highlightBtn).toBeEnabled();
    expect(estimateBtn).toBeEnabled();
    expect(deleteBtn).toBeEnabled();
  });

  it('Ok button is shown when you open disclosure and there is no input value', async () => {
    render(<AddTasks onAdd={() => {}} />);

    userEvent.click(screen.getByRole('open-disclosure'));

    const okBtn = await screen.findByRole('button', { name: /Ok/ });

    expect(okBtn).not.toBeNull();
  });

  it('Add button is shown when you open disclosure and type some value', async () => {
    render(<AddTasks onAdd={() => {}} />);

    userEvent.click(screen.getByRole('open-disclosure'));

    fireEvent.input(await screen.findByRole('input'), {
      target: { textContent: 'text' },
    });

    const addBtn = await screen.findByRole('button', { name: /Add/ });

    expect(addBtn).not.toBeNull();
  });

  it('Cancel button should close toolbar and clear the current input value', async () => {
    render(<AddTasks onAdd={() => {}} />);

    userEvent.click(screen.getByRole('open-disclosure'));

    expect(await screen.findByRole('toolbar')).not.toBeNull();

    fireEvent.input(await screen.findByRole('input'), {
      target: { textContent: 'text' },
    });

    fireEvent.click(await screen.findByRole('button', { name: /Cancel/ }));

    expect(screen.queryByRole('toolbar')).toBeNull();

    expect(screen.getByRole('input')).not.toBeEmptyDOMElement();
  });

  it('Ok button should add an item with a default text and close toolbar ', async () => {
    const items: Task[] = DataList;

    const handleAdd = (item: string) => {
      items.unshift({ id: Math.random().toString(), body: item });
    };

    render(<AddTasks onAdd={handleAdd} />);

    userEvent.click(screen.getByRole('open-disclosure'));

    expect(await screen.findByRole('toolbar')).not.toBeNull();

    fireEvent.click(await screen.findByRole('button', { name: /Ok/ }));

    expect(screen.queryByRole('toolbar')).toBeNull();

    render(<List data={items} />);

    expect(await screen.findAllByRole('list-item')).toHaveLength(4);
  });

  it('Add button should add an item and close toolbar ', async () => {
    const items: Task[] = DataList;

    const handleAdd = (item: string) => {
      items.unshift({ id: Math.random().toString(), body: item });
    };

    render(<AddTasks onAdd={handleAdd} />);

    userEvent.click(screen.getByRole('open-disclosure'));

    expect(await screen.findByRole('toolbar')).not.toBeNull();

    fireEvent.input(await screen.findByRole('input'), {
      target: { textContent: 'Do the landing page' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Add/ }));

    expect(screen.queryByRole('toolbar')).toBeNull();

    render(<List data={items} />);

    expect(await screen.findAllByRole('list-item')).toHaveLength(5);
  });
});
