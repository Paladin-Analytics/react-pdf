import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isText = R.propEq('type', P.Text);

export default isText;
