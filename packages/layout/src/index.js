import * as R from 'ramda';

import asyncCompose from './utils/asyncCompose';
import resolveSvg from './steps/resolveSvg';
import resolveZIndex from './steps/resolveZIndex';
import resolveAssets from './steps/resolveAssets';
import resolveStyles from './steps/resolveStyles';
import resolveOrigins from './steps/resolveOrigins';
import resolvePageBalancing from './steps/resolvePageBalancing';
import resolvePageSizes from './steps/resolvePageSizes';
import resolvePagination from './steps/resolvePagination';
import resolveDimensions from './steps/resolveDimensions';
import resolveTextLayout from './steps/resolveTextLayout';
import resolveInheritance from './steps/resolveInheritance';
import resolvePagePaddings from './steps/resolvePagePaddings';
import resolvePercentRadius from './steps/resolvePercentRadius';
import resolvePercentHeight from './steps/resolvePercentHeight';
import resolveLinkSubstitution from './steps/resolveLinkSubstitution';

// const startTimer = name => R.tap(() => console.time(name));
// const endTimer = name => R.tap(() => console.timeEnd(name));

const DISABLE_LOGS = false;

let lastStage;
const logStatus = (stage, end) =>
  R.tap(doc => {
    if (DISABLE_LOGS) {
      return;
    }

    if (lastStage) {
      console.timeEnd(lastStage);
      console.groupEnd();
    }

    if (end) {
      return;
    }

    console.group(stage);
    console.log('INPUT:');
    console.log(doc);
    console.time(stage);
    lastStage = stage;
  });

const layout = asyncCompose(
  logStatus('end', true),
  resolveZIndex,
  logStatus('resolveZIndex'),
  resolveOrigins,
  logStatus('resolveOrigins'),
  resolvePageBalancing,
  logStatus('resolvePageBalancing'),
  resolvePagination,
  logStatus('resolvePagination'),
  resolveTextLayout,
  logStatus('resolveTextLayout'),
  resolvePercentRadius,
  logStatus('resolvePercentRadius'),
  resolveDimensions,
  logStatus('resolveDimensions'),
  resolveSvg,
  logStatus('resolveSvg'),
  resolveAssets,
  logStatus('resolveAssets'),
  resolveInheritance,
  logStatus('resolveInheritance'),
  resolvePercentHeight,
  logStatus('resolvePercentHeight'),
  resolvePagePaddings,
  logStatus('resolvePagePaddings'),
  resolveStyles,
  logStatus('resolveStyles'),
  resolveLinkSubstitution,
  logStatus('resolveLinkSubstitution'),
  resolvePageSizes,
  logStatus('resolvePageSizes'),
);

export default layout;
