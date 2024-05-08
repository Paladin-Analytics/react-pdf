import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isCircle = R.propEq('type', P.Circle);

export default isCircle;
