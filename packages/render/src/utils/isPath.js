import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isPath = R.propEq('type', P.Path);

export default isPath;
