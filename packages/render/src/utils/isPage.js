import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isPage = R.propEq('type', P.Page);

export default isPage;
