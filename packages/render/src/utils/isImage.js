import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isImage = R.propEq('type', P.Image);

export default isImage;
