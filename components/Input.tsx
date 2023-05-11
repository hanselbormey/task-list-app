import React, { useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { getInnerHtml } from '@/utils/index';

export default function Input({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: string;
  onChange(e: string): void;
}) {
  const uuid = uuidv4();

  const inputDiv = id ? `${id}-input` : `${uuid}-input`;
  const outputDiv = id ? `${id}-output` : `${uuid}-output`;

  const setDiv = (html: string) => {
    const div = document.getElementById(outputDiv);
    if (div) {
      div.innerHTML = html;
      div.focus();
    }
  };

  const setInput = (text: string) => {
    const input = document.getElementById(inputDiv);
    if (input) {
      input.innerText = text;
      input.focus();
    }
  };

  useEffect(() => {
    const div = document.getElementById(inputDiv);
    if (div) {
      div.addEventListener('keypress', (evt) => {
        if (evt.key === 'Enter') {
          evt.preventDefault();
        }
      });
    }
  });

  useEffect(() => {
    if (!value) {
      const div = document.getElementById(outputDiv);
      if (div) {
        setInput('');
        setDiv('');
        const placeholder = document.getElementById('placeholder');
        if (!placeholder) {
          const span = document.createElement('SPAN');
          span.id = 'placeholder';
          span.setAttribute('role', 'placeholder');
          span.innerText = 'Type to add new task';
          span.style['opacity'] = '25%';
          div.append(span);
        }
      }
    }
  }, [value]);

  useEffect(() => {
    if (value) {
      const html = getInnerHtml(value);
      setDiv(html);
      setInput(value);
    }
  }, []);

  return (
    <div className="flex overflow-hidden w-[200px] sm:w-full md:w-full">
      <div className="relative">
        <div
          id={outputDiv}
          role="output"
          className="flex w-full items-center flex-wrap overflow-hidden min-h-[24px]"
        ></div>
        <div
          className="border-none outline-none w-full text-transparent bg-transparent caret-black absolute top-0"
          id={inputDiv}
          role="input"
          data-text="Enter text here"
          contentEditable
          spellCheck={false}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            const inputContent = e.target.textContent || '';
            onChange(inputContent);
            const html = getInnerHtml(inputContent);
            setDiv(html);
          }}
        />
      </div>
    </div>
  );
}
