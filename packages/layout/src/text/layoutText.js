import * as R from 'ramda';
import layoutEngine from '@surge-global-engineering/rpdf-textkit/lib/layout';
import linebreaker from '@surge-global-engineering/rpdf-textkit/lib/engines/linebreaker';
import justification from '@surge-global-engineering/rpdf-textkit/lib/engines/justification';
import textDecoration from '@surge-global-engineering/rpdf-textkit/lib/engines/textDecoration';
import scriptItemizer from '@surge-global-engineering/rpdf-textkit/lib/engines/scriptItemizer';
import wordHyphenation from '@surge-global-engineering/rpdf-textkit/lib/engines/wordHyphenation';

import fontSubstitution from './fontSubstitution';
import getAttributedString from './getAttributedString';

const engines = {
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
};

const engine = layoutEngine(engines);

const getMaxLines = R.path(['style', 'maxLines']);

const getTextOverflow = R.path(['style', 'textOverflow']);

/**
 * Get layout container for specific text node
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Object} node
 * @returns {Object} layout container
 */
const getContainer = (width, height, node) => {
  const maxLines = getMaxLines(node);
  const textOverflow = getTextOverflow(node);

  return {
    x: 0,
    y: 0,
    width,
    maxLines,
    height: height || Infinity,
    truncateMode: textOverflow,
  };
};

/**
 * Get text layout options for specific text node
 *
 * @param {Object} node instance
 * @param {Array} maskRects maskRects
 * @returns {Object} layout options
 */
const getLayoutOptions = (fontStore, node, maskRects) => ({
  hyphenationPenalty: node.props.hyphenationPenalty,
  shrinkWhitespaceFactor: { before: -0.5, after: -0.5 },
  hyphenationCallback:
    node.props.hyphenationCallback ||
    fontStore?.getHyphenationCallback() ||
    null,
  maskRects,
});

/**
 * transform lines to include text length upto that line
 *
 * @param {Array} lines
 * @returns {Array} layout lines
 */
const linesWithRange = lines => {
  let strLength = 0;

  for (let i = 0; i < lines.length; i++) {
    lines[i].textBefore = strLength;
    strLength += lines[i].string.length;
  }

  return lines;
};

/**
 * Get text lines for given node
 *
 * @param {Object} node
 * @param {Array} maskRects
 * @param {Number} container width
 * @param {Number} container height
 * @param {Number} fontStore font store
 * @returns {Array} layout lines
 */
const layoutText = (node, maskRects, width, height, fontStore) => {
  const attributedString = getAttributedString(fontStore, node);
  const container = getContainer(width, height, node);
  const options = getLayoutOptions(fontStore, node, maskRects);
  let lines = engine(attributedString, container, options);
  lines = lines.map(linesWithRange);

  return R.reduce(R.concat, [], lines);
};

export default R.curryN(5, layoutText);
