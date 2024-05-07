import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isGroup = R.propEq('type', P.G);

export default isGroup;
