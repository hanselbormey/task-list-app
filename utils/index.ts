import { Tag } from '@/types/enums';

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

export function getColor(word: string) {
  if (word.startsWith('@')) return Tag.MENTION;
  if (word.startsWith('#')) return Tag.HASHTAG;
  if (word.match(regexps.email)) return Tag.EMAIL;
  if (isValidURL(word)) return Tag.LINK;
  return '';
}

export function convertToHtml(word: string) {
  if (!word) return '';

  const color = getColor(word);

  if (!color) return `<span>${word}</span>`;

  return `<span style="color: ${color}">${word}</span>`;
}

export function getInnerHtml(value: string) {
  if (!value) return '';
  const valueToList: string[] = value
    .split(' ')
    .map((item) => convertToHtml(item));

  return valueToList.join('&nbsp;');
}
