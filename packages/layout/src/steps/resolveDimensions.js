import * as R from 'ramda';
import Yoga from '@surge-global-engineering/rpdf-yoga';
import * as P from '@surge-global-engineering/rpdf-primitives';

import getMargin from '../node/getMargin';
import getPadding from '../node/getPadding';
import getPosition from '../node/getPosition';
import getDimension from '../node/getDimension';
import getBorderWidth from '../node/getBorderWidth';
import getAbsolutePosition from '../node/getAbsolutePosition';
import setDisplay from '../node/setDisplay';
import setOverflow from '../node/setOverflow';
import setFlexWrap from '../node/setFlexWrap';
import setFlexGrow from '../node/setFlexGrow';
import setFlexBasis from '../node/setFlexBasis';
import setAlignSelf from '../node/setAlignSelf';
import setAlignItems from '../node/setAlignItems';
import setFlexShrink from '../node/setFlexShrink';
import setAspectRatio from '../node/setAspectRatio';
import setAlignContent from '../node/setAlignContent';
import setPositionType from '../node/setPositionType';
import setFlexDirection from '../node/setFlexDirection';
import setJustifyContent from '../node/setJustifyContent';
import {
  setMarginTop,
  setMarginRight,
  setMarginBottom,
  setMarginLeft,
} from '../node/setMargin';
import {
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
} from '../node/setPadding';
import {
  setBorderTop,
  setBorderRight,
  setBorderBottom,
  setBorderLeft,
} from '../node/setBorderWidth';
import {
  setPositionTop,
  setPositionRight,
  setPositionBottom,
  setPositionLeft,
} from '../node/setPosition';
import {
  setWidth,
  setHeight,
  setMinWidth,
  setMaxWidth,
  setMinHeight,
  setMaxHeight,
} from '../node/setDimension';
import measureSvg from '../svg/measureSvg';
import measureText from '../text/measureText';
import measureImage from '../image/measureImage';
import measureCanvas from '../canvas/measureCanvas';
import measureSpaceFillingView from '../view/measureSpaceFillingView';

const YOGA_NODE = '_yogaNode';
const YOGA_CONFIG = Yoga.Config.create();

YOGA_CONFIG.setPointScaleFactor(0);

const isType = R.propEq('type');

const isSvg = isType(P.Svg);
const isText = isType(P.Text);
const isView = isType(P.View);
const isNote = isType(P.Note);
const isPage = isType(P.Page);
const isImage = isType(P.Image);
const isCanvas = isType(P.Canvas);
const isTextInstance = isType(P.TextInstance);

const setNodeHeight = node =>
  R.ifElse(
    isPage,
    setHeight(node.box.height),
    setHeight(node.box.height || node.style.height),
  );

/**
 * Set styles valeus into yoga node before layout calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */
const setYogaValues = R.tap(node => {
  R.compose(
    setNodeHeight(node),
    setWidth(node.style.width),
    setMinWidth(node.style.minWidth),
    setMaxWidth(node.style.maxWidth),
    setMinHeight(node.style.minHeight),
    setMaxHeight(node.style.maxHeight),
    setMarginTop(node.style.marginTop),
    setMarginRight(node.style.marginRight || node.style.marginOutside),
    setMarginBottom(node.style.marginBottom),
    setMarginLeft(node.style.marginLeft || node.style.marginInside),
    setPaddingTop(node.style.paddingTop),
    setPaddingRight(node.style.paddingRight),
    setPaddingBottom(node.style.paddingBottom),
    setPaddingLeft(node.style.paddingLeft),
    setPositionType(node.style.position),
    setPositionTop(node.style.top),
    setPositionRight(node.style.right),
    setPositionBottom(node.style.bottom),
    setPositionLeft(node.style.left),
    setBorderTop(node.style.borderTopWidth),
    setBorderRight(node.style.borderRightWidth),
    setBorderBottom(node.style.borderBottomWidth),
    setBorderLeft(node.style.borderLeftWidth),
    setDisplay(node.style.display),
    setFlexDirection(node.style.flexDirection),
    setAlignSelf(node.style.alignSelf),
    setAlignContent(node.style.alignContent),
    setAlignItems(node.style.alignItems),
    setJustifyContent(node.style.justifyContent),
    setFlexWrap(node.style.flexWrap),
    setOverflow(node.style.overflow),
    setAspectRatio(node.style.aspectRatio),
    setFlexBasis(node.style.flexBasis),
    setFlexGrow(node.style.flexGrow),
    setFlexShrink(node.style.flexShrink),
  )(node);
});

/**
 * Attaches a node to it's parent yoga node
 * @param {Object} parentNode
 */
const attachYogNodeToParent = parentNode =>
  R.tap(child => {
    parentNode.insertChild(child[YOGA_NODE], parentNode.getChildCount());
  });

const setMeasureFunc = (page, fontStore) => node => {
  const yogaNode = node[YOGA_NODE];

  if (isText(node)) {
    yogaNode.setMeasureFunc(measureText(page, node, [], fontStore));
  }

  if (isImage(node)) {
    yogaNode.setMeasureFunc(measureImage(page, node));
  }

  if (isCanvas(node)) {
    yogaNode.setMeasureFunc(measureCanvas(page, node));
  }

  if (isSvg(node)) {
    yogaNode.setMeasureFunc(measureSvg(page, node));
  }

  return node;
};

const isNotText = R.complement(isText);
const isNotNote = R.complement(isNote);
const isNotSvg = R.complement(isSvg);
const isNotTextInstance = R.complement(isTextInstance);
const isLayoutElement = R.allPass([isNotText, isNotNote, isNotSvg]);

/**
 * Creates and add yoga node to document tree
 * Handles measure function for text and image nodes
 *
 * @param {Object} node
 * @returns {Object} node with appended yoga node
 */
const createYogaNodes = (
  page,
  fontStore,
  parentNode,
  rootNode,
  masks,
) => node => {
  const yogaNode = Yoga.Node.createWithConfig(YOGA_CONFIG);

  return R.compose(
    R.tap(element => {
      if (isText(element) && element.lines.length) {
        const position = getAbsolutePosition(element);
        const dimension = getDimension(element);
        const maskRects = [];
        // check for collision
        masks.forEach(mask => {
          if (
            mask.absTop + mask.height > position.absTop &&
            position.absTop + dimension.height >= mask.absTop
          ) {
            // there is a vertical collision
            // check for horizontal collision
            if (
              mask.absLeft + mask.width >= position.absLeft &&
              position.absLeft + dimension.width >= mask.absLeft
            ) {
              // console.error('There is a collision', mask, element);
              maskRects.push({
                y: mask.absTop - position.absTop,
                x: mask.absLeft - position.absLeft,
                width: mask.width,
                height: mask.height,
              });
            }
          }
        });
        if (maskRects.length && element.lines?.length) {
          yogaNode.setMeasureFunc(
            measureText(page, element, maskRects, fontStore),
          );
          yogaNode.markDirty();
          rootNode.calculateLayout();
        }
      }

      if (isView(element) && element.props?.fillPreviousWrapTextSpacing) {
        const position = getAbsolutePosition(element);
        const dimension = getDimension(element);
        let fillNeeded = 0;
        // check for collision
        masks.forEach(mask => {
          if (
            mask.absTop + mask.height > position.absTop &&
            position.absTop + dimension.height >= mask.absTop
          ) {
            // there is a vertical collision
            fillNeeded = Math.max(
              fillNeeded,
              mask.absTop + mask.height - position.absTop,
            );
          }
        });

        if (fillNeeded) {
          // console.log('Fill needed', fillNeeded);
          yogaNode.setMeasureFunc(measureSpaceFillingView(fillNeeded));
          yogaNode.markDirty();
          rootNode.calculateLayout();
        }
      }
    }),
    R.tap(element => {
      if (rootNode) {
        // if the element is a sub-element, re-calculate the layout after adding the yoga node
        rootNode.calculateLayout();
        if (element.props?.wrapTextAround) {
          // calculate the absolute position and add it to masks
          const position = getAbsolutePosition(element);
          const dimension = getDimension(element);
          masks.push({ ...position, ...dimension });
        }
      }
    }),
    R.when(
      isLayoutElement,
      R.evolve({
        children: R.map(
          R.compose(
            createYogaNodes(
              page,
              fontStore,
              yogaNode,
              rootNode || yogaNode,
              masks,
            ),
          ),
        ),
      }),
    ),
    R.when(() => !!parentNode, attachYogNodeToParent(parentNode)),
    setMeasureFunc(page, fontStore),
    setYogaValues,
    R.assoc(YOGA_NODE, yogaNode),
  )(node);
};

/**
 * Saves Yoga layout result into 'box' attribute of node
 *
 * @param {Object} node
 * @returns {Object} node with box data
 */
const persistDimensions = node => {
  return R.evolve({
    children: R.map(R.when(isNotTextInstance, persistDimensions)),
    box: R.always(
      R.mergeAll([
        getPadding(node),
        getMargin(node),
        getBorderWidth(node),
        getPosition(node),
        getDimension(node),
      ]),
    ),
  })(node);
};

/**
 * Removes yoga node from document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */
const destroyYogaNodes = node => {
  return R.compose(
    R.dissoc(YOGA_NODE),
    R.evolve({ children: R.map(destroyYogaNodes) }),
  )(node);
};

/**
 * Free yoga node from document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */
const freeYogaNodes = node => {
  if (node[YOGA_NODE]) node[YOGA_NODE].freeRecursive();
  return node;
};

/**
 * Performs yoga calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */
const calculateLayout = page => {
  page[YOGA_NODE].calculateLayout();
  return page;
};

/**
 * Calculates page object layout using Yoga.
 * Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
 * Destroy yoga values at the end.
 *
 * @param {Object} page object
 * @returns {Object} page object with correct 'box' layout attributes
 */
export const resolvePageDimensions = (page, fontStore) =>
  R.ifElse(
    R.isNil,
    R.always(null),
    R.compose(
      destroyYogaNodes,
      freeYogaNodes,
      persistDimensions,
      calculateLayout,
      createYogaNodes(page, fontStore, null, null, []),
    ),
  )(page);

/**
 * Calculates root object layout using Yoga.
 *
 * @param {Object} root object
 * @returns {Object} root object with correct 'box' layout attributes
 */
const resolveDimensions = (node, fontStore) => {
  const mapChild = child => resolvePageDimensions(child, fontStore);
  return R.evolve({ children: R.map(mapChild) })(node);
};

export default resolveDimensions;
