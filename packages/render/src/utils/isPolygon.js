import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isPolygon = R.propEq('type', P.Polygon);

export default isPolygon;
