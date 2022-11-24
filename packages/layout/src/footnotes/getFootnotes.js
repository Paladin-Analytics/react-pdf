/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */

/**
 * calculates the locations  of the footnotes within the given node array
 * this is used to check if a footnote is actually inside a node after line breaking and splitting
 *
 * @param {Array} nodes
 * @returns Array
 */
function calculateFootnoteLocations(nodes) {
  const notes = [];
  let str = '';

  for (const item of nodes) {
    let text = '';

    if (item.type === 'TEXT') {
      text = item.children.map(e => e.value).reduce((a, b) => a + b, '');
    }

    if (item.type === 'TEXT_INSTANCE') {
      text = item.value;
    }

    str += text;

    if (item.props && item.props.footnote) {
      notes.push({ loc: str.length, el: item, ref: text });
    }

    if (item.children) {
      const calculatedOutput = calculateFootnoteLocations(item.children);

      const childNotes = calculatedOutput.notes.map(r => ({
        ...r,
        loc: r.loc + str.length,
      }));

      if (childNotes.length > 0) str += calculatedOutput.childString;
      notes.push(...childNotes);
    }
  }

  return { notes, str };
}

/**
 * Finds all footnotes in a given node
 * checks if a footnote is actually present in the calculated lines of a node
 *
 * @param {Object} node
 * @param {number} top
 * @returns
 */
function getFootnotes(node, top = 0) {
  const parentTop = top || 0;
  const nodeTop = node.box?.top || 0;

  if (node.props?.footnote) {
    return [
      { el: node, loc: 0, approxTop: top, approxBottom: top + node.box.height },
    ];
  }

  const footnotes = [];

  if (!node.children) return [];

  if (node.lines) {
    const widows = node.props?.widows || 2;
    const orphans = node.props?.orphans || 2;

    const { notes: calculatedNotes } = calculateFootnoteLocations(
      node.children,
    );
    const notes = [];
    let topUpto = nodeTop + parentTop;

    for (let i = 0; i < node.lines.length; i += 1) {
      const line = node.lines[i];
      notes.push(
        ...calculatedNotes
          .filter(
            e => e.loc - e.ref.length < line.textBefore + line.string.length,
          )
          .filter(e => e.loc >= line.textBefore)
          .map(r => ({
            ...r,
            approxTop: topUpto,
            approxBottom: topUpto + line.box.height,
            // line should not become a widow or orphan if broken before or after
            breakAfter:
              i + 1 === node.lines.length ||
              (node.lines.length - (i + 1) >= orphans && i + 1 >= widows),
            breakBefore:
              i === 0 || (node.lines.length - i >= orphans && i >= widows),
          })),
      );
      topUpto += line.box.height;
    }

    return notes;
  }
  for (const child of node.children) {
    footnotes.push(...getFootnotes(child, nodeTop + parentTop));
  }
  return footnotes;
}

export default getFootnotes;
