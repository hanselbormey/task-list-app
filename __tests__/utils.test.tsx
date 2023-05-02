import { Tag } from '@/types/enums';
import { convertToHtml, getColor } from '@/utils/index';

describe('getColor', () => {
  it('should return yellow color for emails', () => {
    expect(getColor('hanselbormey@gmail.com')).toBe(Tag.EMAIL);
  });
  it('should return purple color for #hashtags', () => {
    expect(getColor('#task')).toBe(Tag.HASHTAG);
  });
  it('should return green color for @mentions', () => {
    expect(getColor('@dev')).toBe(Tag.MENTION);
  });
  it('should return blue color for url', () => {
    expect(getColor('https://google.com')).toBe(Tag.LINK);
  });
  it('should return an empty string', () => {
    expect(getColor('this is a simple text')).toBe('');
  });
});

describe('convertToHtml', () => {
  it('should return an span with yellow color for emails', () => {
    const word = 'hanselbormey@gmail.com';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${Tag.EMAIL}">${word}</span>`
    );
  });
  it('should return an span with yellow color for emails', () => {
    const word = 'www.mylink.com';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${Tag.LINK}">${word}</span>`
    );
  });
  it('should return an span with yellow color for emails', () => {
    const word = '#UI/UX';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${Tag.HASHTAG}">${word}</span>`
    );
  });
  it('should return an span with yellow color for emails', () => {
    const word = '@userX';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${Tag.MENTION}">${word}</span>`
    );
  });
});
