import * as R from 'ramda';
import Yoga from '@paladin-analytics/rpdf-yoga';

import getMargin from '../../src/node/getMargin';

const getComputedMargin = R.cond([
  [R.equals(Yoga.EDGE_TOP), R.always(1)],
  [R.equals(Yoga.EDGE_RIGHT), R.always(2)],
  [R.equals(Yoga.EDGE_BOTTOM), R.always(3)],
  [R.equals(Yoga.EDGE_LEFT), R.always(4)],
]);

describe('node getMargin', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getMargin({});

    expect(result).toHaveProperty('marginTop', 0);
    expect(result).toHaveProperty('marginRight', 0);
    expect(result).toHaveProperty('marginBottom', 0);
    expect(result).toHaveProperty('marginLeft', 0);
  });

  test('Should return yoga values if node available', () => {
    const _yogaNode = { getComputedMargin };
    const result = getMargin({ _yogaNode });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });

  test('Should return box specific values if available', () => {
    const result = getMargin({
      box: {
        marginTop: 1,
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 4,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });

  test('Should return style specific values if available', () => {
    const result = getMargin({
      style: {
        marginTop: 1,
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 4,
        marginVertical: 5,
        marginHorizontal: 6,
        margin: 7,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });

  test('Should return style axis values if available', () => {
    const result = getMargin({
      style: {
        marginVertical: 1,
        marginHorizontal: 2,
        margin: 3,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 1);
    expect(result).toHaveProperty('marginLeft', 2);
  });

  test('Should return generic margin value if available', () => {
    const result = getMargin({
      style: {
        margin: 1,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 1);
    expect(result).toHaveProperty('marginBottom', 1);
    expect(result).toHaveProperty('marginLeft', 1);
  });
});
