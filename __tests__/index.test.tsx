import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages/index';
import Disclosure from '@/components/Disclosure';
import Input from '@/components/Input';
import { getCurrentFormAction } from '../utils';
import ListItem from '@/components/ListItem';

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
    render(<Home />);

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
    render(<Home />);

    userEvent.click(screen.getByRole('open-disclosure'));

    const okBtn = await screen.findByRole('button', { name: /Ok/ });

    expect(okBtn).not.toBeNull();
  });

  it('Add button is shown when you open disclosure and type some value', async () => {
    render(<Home />);

    userEvent.click(screen.getByRole('open-disclosure'));

    fireEvent.input(await screen.findByRole('input'), {
      target: { textContent: 'text' },
    });

    const addBtn = await screen.findByRole('button', { name: /Add/ });

    expect(addBtn).not.toBeNull();
  });

  it('Cancel button should close toolbar and remove the current input value', async () => {
    render(<Home />);

    userEvent.click(screen.getByRole('open-disclosure'));

    expect(await screen.findByRole('toolbar')).not.toBeNull();

    fireEvent.input(await screen.findByRole('input'), {
      target: { textContent: 'text' },
    });

    fireEvent.click(await screen.findByRole('button', { name: /Cancel/ }));

    expect(screen.queryByRole('toolbar')).toBeNull();

    expect(screen.getByRole('input')).not.toBeEmptyDOMElement();
  });

  it('Add button should close toolbar and add the current input value', async () => {
    render(<Home />);

    userEvent.click(screen.getByRole('open-disclosure'));

    expect(await screen.findByRole('toolbar')).not.toBeNull();

    fireEvent.input(await screen.findByRole('input'), {
      target: { textContent: 'Do the landing page' },
    });

    fireEvent.click(await screen.findByRole('button', { name: /Add/ }));

    expect(screen.queryByRole('toolbar')).toBeNull();

    const { container } = render(
      <ListItem
        item={{ id: Math.random().toString(), body: 'Do the landing page' }}
      />
    );

    expect(screen.getByRole('input')).not.toBeEmptyDOMElement();

    expect(container).toBeInTheDocument();
  });
});
