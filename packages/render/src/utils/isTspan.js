import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isTspan = R.propEq('type', P.Tspan);

export default isTspan;
