import * as P from '@surge-global-engineering/rpdf-primitives';
import isLink from '../../src/utils/isLink';

const ASSERTED_TYPE = P.Link;
const PRIMITIVES = Object.keys(P.default);

describe('is link util', () => {
  PRIMITIVES.forEach(type => {
    const isAssertedType = type === ASSERTED_TYPE;
    const result = isAssertedType ? 'true' : 'false';

    test(`should return ${result} for ${type} node`, () => {
      expect(isLink({ type })).toBe(isAssertedType);
    });
  });
});
