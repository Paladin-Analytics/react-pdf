/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from '@surge-global-engineering/rpdf-renderer';
import fonts from './fonts';

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: '100%',
  },
  textSuper: {
    fontVariant: 'superscript',
  },
  textSub: {
    fontVariant: 'subscript',
  },
  textSC: {
    fontVariant: 'small-caps',
  },
  titleText: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleContainer: {},
  container: {
    margin: 20,
  },
  test: {
    marginBottom: 5,
  },
});

// Font.register({
//   family: 'Anton-Regular',
//   src: 'https://atticus-content.s3.amazonaws.com/fonts/Anton-Regular.ttf',
// });
// Font.register({
//   family: 'PressStart2P-Regular',
//   src:
//     'https://atticus-content.s3.amazonaws.com/fonts/PressStart2P-Regular.ttf',
// });

export default ({ fontFamily }) => {
  return (
    <Document>
      <Page size="A4">
        <View style={styles.container}>
          <Text style={[styles.textSC, { fontFamily: 'Benne' }]}>
            SmAll CaPs : Benne
          </Text>
          <View style={{ margin: 10 }}>
            <Text style={[styles.textSC]}>SmAll CaPs</Text>
            <Text>
              <Text style={[styles.textSC]}>SmAlL CApS</Text>
            </Text>
          </View>
          {fonts.map((font, i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <Text style={{ marginBottom: 5 }}>{font.family}</Text>
              <Text style={{ fontSize: 12, color: 'green' }}>Superscript</Text>
              <Text
                style={[styles.text, styles.test, { fontFamily: font.family }]}
              >
                Both low and high superscripts can be used to indicate the
                presence of a footnote in a document, like this Both low and
                high superscripts can be used to indicate the presence of a
                footnote in a document, like this
                <Text style={[styles.text, styles.textSuper]}>5</Text> or this
                <Text style={[styles.text, styles.textSuper]}>xi</Text>
              </Text>
              <Text style={{ fontSize: 12, color: 'green' }}>Subscript</Text>
              <Text
                style={[styles.text, styles.test, { fontFamily: font.family }]}
              >
                The molecular formula for glucose is C
                <Text style={[styles.text, styles.textSub]}>6</Text>H
                <Text style={[styles.text, styles.textSub]}>12</Text>O
                <Text style={[styles.text, styles.textSub]}>6</Text> (meaning
                that it is a molecule with 6 carbon atoms, 12 hydrogen atoms and
                6 oxygen atoms). Or the most famous molecule in the world,
                water, known almost universally by its chemical formula, H
                <Text style={[styles.text, styles.textSub]}>2</Text>O (meaning
                it has 2 hydrogen atoms and 1 oxygen atom.)
              </Text>
              <Text style={{ fontSize: 12, color: 'green' }}>Small Caps</Text>
              <Text
                style={[
                  styles.textSC,
                  styles.text,
                  { fontFamily: font.family },
                ]}
              >
                Lorem ipsum dolor ameted, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt UteLaBore et dolore magna aliqua.
              </Text>
            </View>
          ))}
          {/* <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Superscript</Text>
          </View>
          <Text style={[styles.text, { fontFamily }]}>
            5
            <Text style={[styles.text, styles.textSuper, { fontFamily }]}>
              th
            </Text>
          </Text>
          <Text style={[styles.text, { fontFamily }]}>
            p
            <Text style={[styles.text, styles.textSuper, { fontFamily }]}>
              2
            </Text>
            H
            <Text style={[styles.text, styles.textSuper, { fontFamily }]}>
              2
            </Text>
          </Text>
          <Text style={[styles.text, { fontFamily }]}>
            Both low and high superscripts can be used to indicate the presence
            of a footnote in a document, like this
            <Text style={[styles.text, styles.textSuper]}>5</Text>
            {' '}
            or this
            <Text style={[styles.text, styles.textSuper]}>xi</Text>
            .
          </Text>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Subscript</Text>
          </View> */}
          <View>
            {/* <Text style={styles.text}>
            100100100101
            <Text style={[styles.text, styles.textSub]} subscript>
              2
            </Text>
            {' '}
            <Text style={styles.text}>
              + 234
            </Text>
          </Text> */}
            {/* <Text style={styles.text}>
            H
            <Text style={[styles.text, styles.textSub]}>
              2
            </Text>
            O
          </Text> */}
            {/* <Text style={[styles.text, { fontFamily }]}>
              The molecular formula for glucose is C
              <Text style={[styles.text, styles.textSub]}>6</Text>
              p
              <Text style={[styles.text, styles.textSub]}>12</Text>
              O
              <Text style={[styles.text, styles.textSub]}>6</Text>
              {' '}
              (meaning that
              it is a molecule with 6 carbon atoms, 12 hydrogen atoms and 6
              oxygen atoms). Or the most famous molecule in the world, water,
              known almost universally by its chemical formula, H
              <Text style={[styles.text, styles.textSub]}>2</Text>
              O (meaning it
              has 2 hydrogen atoms and 1 oxygen atom.)
            </Text> */}
          </View>
          <View>
            {/* <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Small Caps</Text>
            </View>
            <Text style={[styles.textSC, styles.text, { fontFamily }]}>
              Lorem ipsum dolor ameted, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt UteLaBore et dolore magna aliqua.
            </Text> */}
          </View>
        </View>
      </Page>
    </Document>
  );
};
