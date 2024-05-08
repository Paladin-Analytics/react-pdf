import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isLink = R.propEq('type', P.Link);

export default isLink;
