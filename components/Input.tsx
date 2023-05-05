import React, { useEffect, useState } from 'react';

import { PlusSquare } from 'react-feather';

import { getInnerHtml } from '@/utils/index';

export default function Input({
  value,
  onChange,
}: {
  value: string;
  onChange(e: string): void;
}) {
  const setDiv = (html: string) => {
    const div = document.getElementById('div');
    if (div) {
      div.innerHTML = html;
      div.focus();
    }
  };

  const setInput = (text: string) => {
    const input = document.getElementById('input');
    if (input) {
      input.innerText = text;
      input.focus();
    }
  };

  useEffect(() => {
    const div = document.getElementById('input');
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
      const div = document.getElementById('div');
      if (div) {
        setInput('');
        setDiv('');
        const placeholder = document.getElementById('placeholder');
        if (!placeholder) {
          const span = document.createElement('SPAN');
          span.id = 'placeholder';
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
    <div className="flex">
      <PlusSquare className="text-blue-500 w-6 h-6 mr-2" />
      <div className="relative">
        <div
          id="div"
          className="flex w-full items-center flex-wrap overflow-hidden min-h-[24px]"
        ></div>
        <div
          className="border-none outline-none w-full text-transparent bg-transparent caret-black absolute top-0"
          id="input"
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
