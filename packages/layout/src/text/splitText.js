import * as R from 'ramda';
import * as P from '@surge-global-engineering/rpdf-primitives';

import lineIndexAtHeight from './lineIndexAtHeight';
import heightAtLineIndex from './heightAtLineIndex';

const isType = R.propEq('type');

const isText = isType(P.Text);
const isImage = isType(P.Image);
const isTextInstance = isType(P.TextInstance);

const zero = R.always(0);

const getTop = R.pathOr(0, ['box', 'top']);

const getWidows = R.pathOr(2, ['props', 'widows']);

const getOrphans = R.pathOr(2, ['props', 'orphans']);

/**
 * compute line break index
 * @returns [number, number] where the second value represents # of lines dropped for orphan/widow protection
 */
const getLineBreak = (node, height) => {
  const top = getTop(node);
  const widows = getWidows(node);
  const orphans = getOrphans(node);
  const linesQuantity = node.lines.length;
  const slicedLine = lineIndexAtHeight(node, height - top);

  if (slicedLine === 0) {
    return [0, 0];
  }

  if (linesQuantity < orphans) {
    return [linesQuantity - 1, 0];
  }

  if (slicedLine < orphans || linesQuantity < orphans + widows) {
    return [0, slicedLine];
  }

  if (linesQuantity === orphans + widows) {
    return [orphans, Math.max(0, slicedLine - orphans)];
  }

  if (linesQuantity - slicedLine < widows) {
    return [linesQuantity - widows, slicedLine - (linesQuantity - widows)];
  }

  return [slicedLine, 0];
};

const splitTextChildren = (node, splitIndex) => {
  const current = [];
  const next = [];

  let accumulatedLength = 0;
  for (let index = 0; index < node.children.length; index += 1) {
    const child = node.children[index];
    const localSplitIndex = Math.max(0, splitIndex - accumulatedLength);
    let length = 0;

    if (isTextInstance(child)) {
      length = child.value ? child.value.length : 0;
      if (length < localSplitIndex) {
        current.push(child);
      } else {
        // split the characters into two

        if (localSplitIndex > 0) {
          // there is data for the first part
          current.push({
            ...child,
            value: child.value.slice(0, localSplitIndex),
          });
        }

        if (length > localSplitIndex) {
          // there is data for the second part
          next.push({
            ...child,
            value: child.value.slice(localSplitIndex),
          });
        }
      }
    } else if (isText(child)) {
      let currentSubChildren;
      let nextSubChildren;

      [currentSubChildren, nextSubChildren, length] = splitTextChildren(
        child,
        localSplitIndex,
      );

      if (currentSubChildren.length) {
        const currentChild = R.evolve({
          style: R.evolve({
            marginBottom: zero,
            paddingBottom: zero,
            borderBottomWidth: zero,
            borderBottomLeftRadius: zero,
            borderBottomRightRadius: zero,
          }),
          children: R.always(currentSubChildren),
        })(child);
        current.push(currentChild);
      }
      if (nextSubChildren.length) {
        const nextChild = R.compose(
          R.evolve({
            style: R.when(
              () => currentSubChildren.length,
              R.evolve({
                textIndent: zero, // remove any text-indent
              }),
            ),
          }),
          R.evolve({
            style: R.evolve({
              marginTop: zero,
              paddingTop: zero,
              borderTopWidth: zero,
              borderTopLeftRadius: zero,
              borderTopRightRadius: zero,
            }),
            children: R.always(nextSubChildren),
          }),
        )(child);
        next.push(nextChild);
      }
    } else if (isImage(child)) {
      // an image takes up a single character in `lines`
      length = 1;
      if (length < localSplitIndex) {
        current.push(child);
      } else {
        next.push(child);
      }
    } else {
      throw new Error(
        'Expected TEXT / TEXT_INSTANCE / IMAGE to split children',
      );
    }
    accumulatedLength += length;
  }

  return [current, next, accumulatedLength];
};

// Also receives contentArea in case it's needed
const splitText = (node, height) => {
  const [slicedLineIndex, lineSkips] = getLineBreak(node, height);
  const currentHeight = heightAtLineIndex(node, slicedLineIndex);
  const nextHeight = node.box.height - currentHeight;

  const [currentChildren, nextChildren] = splitTextChildren(
    node,
    node.lines[slicedLineIndex].textBefore,
  );

  // recalculate the `textBefore` property for the nextLines
  let textBefore = 0;
  const nextLines = node.lines.slice(slicedLineIndex).map(line => {
    const result = {
      ...line,
      textBefore,
    };

    textBefore += line.string.length;
    return result;
  });

  const current = R.compose(
    R.assocPath(['props', 'lineSkips'], lineSkips),
    R.evolve({
      lines: R.slice(0, slicedLineIndex),
      style: R.evolve({
        marginBottom: zero,
        paddingBottom: zero,
        borderBottomWidth: zero,
        borderBottomLeftRadius: zero,
        borderBottomRightRadius: zero,
      }),
      box: {
        height: R.always(currentHeight),
        borderBottomWidth: zero,
      },
      children: R.always(currentChildren),
    }),
  )(node);

  const next = R.compose(
    R.evolve({
      style: R.when(
        () => currentChildren.length,
        R.evolve({
          textIndent: zero, // remove any text-indent
        }),
      ),
    }),
    R.evolve({
      lines: R.always(nextLines),
      style: R.evolve({
        marginTop: zero,
        paddingTop: zero,
        borderTopWidth: zero,
        borderTopLeftRadius: zero,
        borderTopRightRadius: zero,
      }),
      box: {
        top: zero,
        height: R.always(nextHeight),
        borderTopWidth: zero,
      },
      children: R.always(nextChildren),
    }),
  )(node);

  return [current, next];
};

export default splitText;
