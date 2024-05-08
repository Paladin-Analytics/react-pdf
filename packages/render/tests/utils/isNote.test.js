import * as P from '@surge-global-engineering/rpdf-primitives';
import isNote from '../../src/utils/isNote';

const ASSERTED_TYPE = P.Note;
const PRIMITIVES = Object.keys(P.default);

describe('is note util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isNote({ type })).toBe(isAssertedType);
    });
  });
});
