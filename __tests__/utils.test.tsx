import { Tag } from '@/types/enums';
import { COLOR } from '@/utils/constants';
import { convertToHtml, getColor, getTag } from '@/utils/index';

describe('getTag', () => {
  it('should return Tag.EMAIL', () => {
    expect(getTag('hanselbormey@gmail.com')).toBe(Tag.EMAIL);
  });
  it('should return Tag.HASHTAG', () => {
    expect(getTag('#task')).toBe(Tag.HASHTAG);
  });
  it('should return Tag.MENTION', () => {
    expect(getTag('@dev')).toBe(Tag.MENTION);
  });
  it('should return Tag.LINK', () => {
    expect(getTag('https://google.com')).toBe(Tag.LINK);
  });
  it('should return an empty string', () => {
    expect(getTag('this is a simple text')).toBe('');
  });
});

describe('getColor', () => {
  it('should return yellow color for emails', () => {
    expect(getColor(Tag.EMAIL)).toBe(COLOR[Tag.EMAIL]);
  });
  it('should return purple color for #hashtags', () => {
    expect(getColor(Tag.HASHTAG)).toBe(COLOR[Tag.HASHTAG]);
  });
  it('should return green color for @mentions', () => {
    expect(getColor(Tag.MENTION)).toBe(COLOR[Tag.MENTION]);
  });
  it('should return blue color for url', () => {
    expect(getColor(Tag.LINK)).toBe(COLOR[Tag.LINK]);
  });
});

describe('convertToHtml', () => {
  it('should return an span with yellow color for emails', () => {
    const word = 'hanselbormey@gmail.com';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${COLOR[Tag.EMAIL]}">${word}</span>`
    );
  });
  it('should return an span with yellow color for emails', () => {
    const word = 'www.mylink.com';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${COLOR[Tag.LINK]}">${word}</span>`
    );
  });
  it('should return an span with yellow color for emails', () => {
    const word = '#UI/UX';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${COLOR[Tag.HASHTAG]}">${word}</span>`
    );
  });
  it('should return an span with yellow color for emails', () => {
    const word = '@userX';
    expect(convertToHtml(word)).toBe(
      `<span style="color: ${COLOR[Tag.MENTION]}">${word}</span>`
    );
  });
});
