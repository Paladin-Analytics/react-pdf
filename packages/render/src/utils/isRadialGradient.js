import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isRadialGradient = R.propEq('type', P.RadialGradient);

export default isRadialGradient;
