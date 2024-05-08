import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isEllipse = R.propEq('type', P.Ellipse);

export default isEllipse;
