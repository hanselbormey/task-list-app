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

import { Action } from '@/types/enums';

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
  onCancel(): void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = () => {
    setOpen(false);
    onCancel();
  };

  return (
    <div className={`${open ? 'border  rounded-md shadow-md' : ''}`}>
      <>
        <div
          id="button"
          className="p-4 flex align-top justify-between"
          onClick={() => setOpen(true)}
        >
          {children}
          {open && (
            <button
              disabled={disabledActionButtons}
              className="disabled:opacity-50"
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
          <div id="panel" className="w-full flex justify-between border-t p-2">
            <div id="buttons-container" className="flex">
              <button
                className="h-12 flex justify-evenly items-center rounded-md py-2 px-4 m-0.5 mr-4 md:mr-8 disabled:opacity-50 disabled:bg-gray-100 bg-gray-100 hover:bg-gray-200"
                disabled={disabledActionButtons}
              >
                <Maximize2 className="lg:mr-3 text-gray-600" />{' '}
                <span className="lg:flex hidden disable: text-gray-500 font-medium">
                  Open
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50 disabled:bg-gray-100 hover:bg-gray-200"
                disabled={disabledActionButtons}
              >
                <Calendar className="lg:mr-3 text-gray-400" />
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Today
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50 disabled:bg-gray-100 hover:bg-gray-200"
                disabled={disabledActionButtons}
              >
                <Unlock className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Public
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50 disabled:bg-gray-100 hover:bg-gray-200"
                disabled={disabledActionButtons}
              >
                <Sun className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Highlight
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50 disabled:bg-gray-100 hover:bg-gray-200"
                disabled={disabledActionButtons}
              >
                <Disc className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Estimate
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50 disabled:bg-gray-100 hover:bg-gray-200"
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
                className="h-12 items-center  rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-gray-100 hover:bg-gray-200 hidden lg:flex"
              >
                Cancel
              </button>
              <>
                {formAction === Action.SAVE ? (
                  <button
                    id="save"
                    onClick={() => onSubmit(Action.SAVE)}
                    className="h-12 flex items-center rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    <Save className="flex lg:hidden lg:mr-3" />{' '}
                    <span className="font-medium hidden lg:flex">Save</span>
                  </button>
                ) : formAction === Action.ADD ? (
                  <button
                    id="add"
                    onClick={() => {
                      onSubmit(Action.ADD);
                      setOpen(false);
                    }}
                    className="h-12 flex items-center rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-blue-700 hover:bg-blue-800 text-white"
                  >
                    <Plus className="flex lg:hidden  lg:mr-3" />{' '}
                    <span className="font-medium hidden lg:flex">Add</span>
                  </button>
                ) : (
                  <button
                    id="ok"
                    onClick={() => {
                      onSubmit(Action.OK);
                      setOpen(false);
                    }}
                    className="h-12 flex items-center rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-blue-700 hover:bg-blue-800 text-white"
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
