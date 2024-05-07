import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isRect = R.propEq('type', P.Rect);

export default isRect;
