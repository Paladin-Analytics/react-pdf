import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isCanvas = R.propEq('type', P.Canvas);

export default isCanvas;
