import { Action, Tag } from '@/types/enums';
import { BG_COLOR, COLOR, TXT_COLOR } from './constants';

export const regexps = {
  url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
  mention: /\B@\w+\b/gi,
  hashtag: /\B#\w+\b/gi,
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
};

function isValidURL(url: string) {
  var res = url.match(regexps.url);
  return res !== null;
}

export function isEmail(text: string) {
  const found = text.matchAll(regexps.email);
  if (!found) return null;

  return found;
}

export function getTag(word: string) {
  if (word.startsWith('@')) return Tag.MENTION;
  if (word.startsWith('#')) return Tag.HASHTAG;
  if (word.match(regexps.email)) return Tag.EMAIL;
  if (isValidURL(word)) return Tag.LINK;
  return '';
}

export const getColor = (tag: Tag) => COLOR[tag];

export const getTextColor = (tag: Tag) => TXT_COLOR[tag];

export const getBgColor = (tag: Tag) => BG_COLOR[tag];

export function convertToHtml(word: string) {
  if (!word) return '';

  let html = '';

  const tag = getTag(word);

  if (tag) {
    const color = getColor(tag);
    html = `<span style="color: ${color}">${word}</span>`;
  } else html = `<span>${word}</span>`;

  return html;
}

export function getInnerHtml(value: string) {
  if (!value) return '';
  const valueToList: string[] = value
    .split(' ')
    .map((item) => convertToHtml(item));

  return valueToList.join('&nbsp;');
}

export function getCurrentFormAction(initValue: string, lastValue: string) {
  let result = Action.SAVE;
  if (initValue === lastValue || lastValue === '') result = Action.OK;
  if (!initValue && lastValue) result = Action.ADD;
  return result;
}
