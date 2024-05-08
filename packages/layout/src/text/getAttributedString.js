import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';
import AttributedString from '@surge-global-engineering/rpdf-textkit/lib/attributedString';

import { embedEmojis } from './emoji';
import ignoreChars from './ignoreChars';
import transformText from './transformText';

const PREPROCESSORS = [ignoreChars, embedEmojis];

const isType = R.propEq('type');

const isImage = isType(P.Image);

const isTextInstance = isType(P.TextInstance);

/**
 * Get textkit fragments of given node object
 *
 * @param {Object} font store
 * @param {Object} instance node
 * @returns {Array} text fragments
 */
const getFragments = (fontStore, instance, parentLink, level = 0) => {
  if (!instance) return [{ string: '' }];

  let fragments = [];

  const {
    color = 'black',
    fontFamily = 'Helvetica',
    fontWeight,
    fontStyle,
    fontSize = 18,
    textAlign = 'left',
    lineHeight,
    textDecoration,
    textDecorationColor,
    textDecorationStyle,
    textTransform,
    letterSpacing,
    textIndent,
    opacity,
    fontVariant = 'normal',
  } = instance.style;

  const fontFamilies = [fontFamily, ...fontStore.getFallbackFontFamilies()];

  let font;
  const fonts = [];
  
  for(let i=0; i<fontFamilies.length; i+=1) {
    const opts = { fontFamily: fontFamilies[i], fontWeight, fontStyle };
    const obj = fontStore ? fontStore.getFont(opts) : null;
    font = obj ? obj.data : fontFamilies[i];
    if(font) fonts.push(font);
    else console.warn("Expected font not found for configuration", opts);
  }
  
  [font] = fonts;
  const fallbackFonts = fonts.slice(1);

  // Don't pass main background color to textkit. Will be rendered by the render package instead
  const backgroundColor = level === 0 ? null : instance.style.backgroundColor;

  const attributes = {
    font,
    fallbackFonts,
    color,
    opacity,
    fontSize,
    backgroundColor,
    align: textAlign,
    indent: textIndent,
    characterSpacing: letterSpacing,
    strikeStyle: textDecorationStyle,
    underlineStyle: textDecorationStyle,
    underline:
      textDecoration === 'underline' ||
      textDecoration === 'underline line-through' ||
      textDecoration === 'line-through underline',
    strike:
      textDecoration === 'line-through' ||
      textDecoration === 'underline line-through' ||
      textDecoration === 'line-through underline',
    strikeColor: textDecorationColor || color,
    underlineColor: textDecorationColor || color,
    link: parentLink || instance.props?.src || instance.props?.href,
    lineHeight: lineHeight ? lineHeight * fontSize : null,
    fontVariant,
  };

  for (let i = 0; i < instance.children.length; i += 1) {
    const child = instance.children[i];

    if (isImage(child)) {
      fragments.push({
        string: String.fromCharCode(0xfffc),
        attributes: {
          ...attributes,
          attachment: {
            width: child.style.width || fontSize,
            height: child.style.height || fontSize,
            image: child.image.data,
          },
        },
      });
    } else if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        attributes,
      });
    } else if (child) {
      fragments.push(
        ...getFragments(fontStore, child, attributes.link, level + 1),
      );
    }
  }

  for (let i = 0; i < PREPROCESSORS.length; i += 1) {
    const preprocessor = PREPROCESSORS[i];
    fragments = preprocessor(fragments);
  }

  return fragments;
};

/**
 * Get textkit attributed string from text node
 *
 * @param {Object} font store
 * @param {Object} instance node
 * @returns {Object} attributed string
 */
const getAttributedString = (fontStore, instance) => {
  const fragments = getFragments(fontStore, instance);
  return AttributedString.fromFragments(fragments);
};

export default R.curryN(2, getAttributedString);
