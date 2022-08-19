import {getNumberOfWordsOnDiv,validateUserGeneratedTextWithSpecialCharacters} from '../helpers';
import {DESKTOP_SCREEN_WIDTH} from '../constants';

test('gets number of words on a row, by screen width', () => {
    expect(getNumberOfWordsOnDiv(DESKTOP_SCREEN_WIDTH)).toBe(8);
  });

  test('check given string for matching special character', () => {
    expect(validateUserGeneratedTextWithSpecialCharacters("@")).toBe(true);
  });