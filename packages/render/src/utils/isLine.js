import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isLine = R.propEq('type', P.Line);

export default isLine;
