import * as R from 'ramda';

import fromFragments from '../attributedString/fromFragments';
import isUrl from '../utils/isUrl';

/**
 * Default word hyphenation engine used when no one provided.
 * Does not perform word hyphenation at all
 *
 * @param  {String} word
 * @return {Array} same word
 */
const defaultHyphenationEngine = word => [word];

/**
 * Wrapper for HyphenationEngine
 * This wrapper function handles the special case of word being a URL
 * URL text length is often longer than the page width. For that URL text will be split into charactors
 * Ex: http://example.com?text=xxx -> ["h","t","t","p",":","/","/","e","x","a","m","p","l","e",".","c","o","m","?","t","e","x","t","=","x","x","x"]
 * 
 * @param {HyphenationEngine} hyphenator
 * @param {String} word 
 * @returns {HyphenationEngine}
 */
const hyphenateWordWrapper = (hyphenator, word) => {
  if (isUrl(word)) {
    return _word => _word.split('');
  }
  return hyphenator;
};

/**
 * Wrap words of attribute string
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string including syllables
 */
const wrapWords = (engines = {}, options = {}, attributedString) => {
  const syllables = [];
  const fragments = [];

  const hyphenateWord =
    options.hyphenationCallback ||
    (engines.wordHyphenation && engines.wordHyphenation(options)) ||
    defaultHyphenationEngine;

  const _isUrl = isUrl(attributedString.string);

  for (let i = 0; i < attributedString.runs.length; i += 1) {
    let string = '';
    const run = attributedString.runs[i];
    const words = attributedString.string
      .slice(run.start, run.end)
      .split(/([ ]+)/g)
      .filter(Boolean);

    for (let j = 0; j < words.length; j += 1) {
      const word = words[j];
      const parts = hyphenateWordWrapper(hyphenateWord, word)(word);
      syllables.push(...parts);
      string += parts.join('');
    }

    fragments.push({ string, attributes: run.attributes });
  }

  // Pass isUrl flag to show this string in the attributedString is a URL
  // This flag is used in the line breaker engine to determine whether or not to insert a hyphen into the URL
  return { ...fromFragments(fragments), syllables, isUrl: _isUrl };
};

export default R.curryN(3, wrapWords);
