import { useState } from 'react';
import {
  Calendar,
  Disc,
  Maximize2,
  Plus,
  Save,
  Sun,
  Trash2,
  Unlock,
  X,
} from 'react-feather';

import cn from 'classnames';

import { Action } from '@/types/enums';

const styles = {
  actionBtn:
    'h-10 flex items-center rounded-md py-1 px-1 m-0.5 md:px-4 lg:border-2 disabled:opacity-50 disabled:bg-transparent hover:bg-gray-200',
  primaryBtn:
    'h-10 flex items-center rounded-md py-1 px-2 m-0.5 lg:px-6 disabled:opacity-50 bg-blue-700 hover:bg-blue-800 text-white',
};

export default function Disclosure({
  children,
  disabledActionButtons,
  formAction,
  onSubmit,
  onCancel,
}: {
  children: JSX.Element;
  disabledActionButtons: boolean;
  formAction: string;
  onSubmit(e: string): void;
  onCancel?(): void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
    onCancel ? onCancel() : null;
  };

  return (
    <div
      className={cn('w-full', `${open ? 'border  rounded-md shadow-md' : ''}`)}
    >
      <>
        <div
          id="button"
          role="open-disclosure"
          className={cn(
            'flex justify-center align-top w-full',
            `${open ? 'p-4' : ''}`
          )}
          onClick={() => setOpen(!open)}
        >
          <div className="flex w-full">{children}</div>
          {open && (
            <button
              id="avatar"
              name="avatar"
              role="avatar"
              disabled={disabledActionButtons}
              className="disabled:opacity-50 flex flex-shrink-0"
            >
              <img
                className="w-7 h-7 rounded-2xl object-cover"
                src="man_avatar.jpg"
                width={8}
                height={8}
              />
            </button>
          )}
        </div>
        {open ? (
          <div
            id="toolbar"
            role="toolbar"
            aria-label="toolbar"
            className="w-full flex justify-between border-t p-2"
          >
            <div id="buttons-container" className="flex">
              <button
                name="open"
                className="h-10 flex justify-evenly items-center rounded-md py-2 px-4 m-0.5 mr-4 md:mr-8 disabled:opacity-50 disabled:bg-gray-100 bg-gray-100 hover:bg-gray-200"
                disabled={disabledActionButtons}
              >
                <Maximize2 className="lg:mr-3 text-gray-600" />{' '}
                <span className="lg:flex hidden disable: text-gray-500 font-medium">
                  Open
                </span>
              </button>
              <button
                className={styles.actionBtn}
                disabled={disabledActionButtons}
              >
                <Calendar className="lg:mr-3 text-gray-400" />
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Today
                </span>
              </button>
              <button
                className={styles.actionBtn}
                disabled={disabledActionButtons}
              >
                <Unlock className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Public
                </span>
              </button>
              <button
                className={styles.actionBtn}
                disabled={disabledActionButtons}
              >
                <Sun className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Highlight
                </span>
              </button>
              <button
                className={styles.actionBtn}
                disabled={disabledActionButtons}
              >
                <Disc className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Estimate
                </span>
              </button>
              <button
                className={styles.actionBtn}
                disabled={disabledActionButtons}
              >
                <Trash2 className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Delete
                </span>
              </button>
            </div>
            <div className="flex">
              <button
                onClick={handleCancel}
                className="h-10 items-center  rounded-md py-2 px-4 m-0.5 lg:px-6 disabled:opacity-50 bg-gray-100 hover:bg-gray-200 hidden lg:flex"
              >
                Cancel
              </button>
              <>
                {formAction === Action.SAVE ? (
                  <button
                    id="save"
                    onClick={() => onSubmit(Action.SAVE)}
                    className={styles.primaryBtn}
                  >
                    <Save className="flex lg:hidden lg:mr-3" />
                    <span className="font-medium hidden lg:flex">Save</span>
                  </button>
                ) : formAction === Action.ADD ? (
                  <button
                    id="add"
                    onClick={() => {
                      onSubmit(Action.ADD);
                      setOpen(false);
                    }}
                    className={styles.primaryBtn}
                  >
                    <Plus className="flex lg:hidden  lg:mr-3" />
                    <span className="font-medium hidden lg:flex">Add</span>
                  </button>
                ) : (
                  <button
                    id="ok"
                    onClick={() => {
                      onSubmit(Action.OK);
                      setOpen(false);
                    }}
                    className={styles.primaryBtn}
                  >
                    <X className="flex lg:hidden lg:mr-3" />
                    <span className="font-medium hidden lg:flex">Ok</span>
                  </button>
                )}
              </>
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
}
