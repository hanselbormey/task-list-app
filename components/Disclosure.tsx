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

export default function Disclosure({
  children,
  disabledButtons,
  formAction,
  onSubmit,
}: {
  children: JSX.Element;
  disabledButtons: boolean;
  formAction: string;
  onSubmit(e: string): void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={`${open ? 'border  rounded-md shadow-md' : ''}`}>
      <>
        <div id="button" className="p-4" onClick={() => setOpen(!open)}>
          {children}
        </div>
        {open ? (
          <div id="panel" className="w-full flex justify-between border-t p-2">
            <div id="buttons-container" className="flex">
              <button
                className="h-12 flex justify-evenly items-center border-2 rounded-md py-2 px-4 m-0.5 mr-4 md:mr-8 disabled:opacity-50 bg-gray-200"
                disabled={disabledButtons}
              >
                <Maximize2 className="lg:mr-3 text-gray-600" />{' '}
                <span className="lg:flex hidden  font-medium">Open</span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50"
                disabled={disabledButtons}
              >
                <Calendar className="lg:mr-3 text-gray-400" />
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Today
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50"
                disabled={disabledButtons}
              >
                <Unlock className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Public
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50"
                disabled={disabledButtons}
              >
                <Sun className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Highlight
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50"
                disabled={disabledButtons}
              >
                <Disc className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Estimate
                </span>
              </button>
              <button
                className="h-12 flex justify-evenly items-center md:border-2 rounded-md py-2 px-4 m-0.5 disabled:opacity-50"
                disabled={disabledButtons}
              >
                <Trash2 className="lg:mr-3 text-gray-400" />{' '}
                <span className="lg:flex hidden text-gray-400 font-medium">
                  Delete
                </span>
              </button>
            </div>
            <div className="flex">
              <button className="h-12 items-center md:border rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-gray-300 hidden lg:flex">
                Cancel
              </button>
              <>
                {formAction === 'save' ? (
                  <button
                    id="save"
                    onClick={() => onSubmit('save')}
                    className="h-12 flex items-center md:border rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-blue-800 text-white"
                  >
                    <Save className="flex lg:hidden lg:mr-3" />{' '}
                    <span className="font-medium hidden lg:flex">Save</span>
                  </button>
                ) : formAction === 'add' ? (
                  <button
                    id="add"
                    onClick={() => onSubmit('add')}
                    className="h-12 flex items-center md:border rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-blue-800 text-white"
                  >
                    <Plus className="flex lg:hidden  lg:mr-3" />{' '}
                    <span className="font-medium hidden lg:flex">Add</span>
                  </button>
                ) : (
                  <button
                    id="ok"
                    onClick={() => onSubmit('ok')}
                    className="h-12 flex items-center md:border rounded-md py-2 px-4 m-0.5 disabled:opacity-50 bg-blue-800 text-white"
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
