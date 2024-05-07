import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

const isNote = R.propEq('type', P.Note);

export default isNote;
