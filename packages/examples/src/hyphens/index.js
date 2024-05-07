import React from 'react';
import {
  Document,
  Font,
  Page,
  Text,
  StyleSheet,
  View,
} from '@surge-global-engineering/rpdf-renderer';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  chapter: {
    margin: 12,
  },
  text: {
    fontSize: 20,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
    marginBottom: 10,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

const Subtitle = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);

export default () => (
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <Subtitle>
        Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
        Quijote de la Mancha
      </Subtitle>
      <View style={styles.chapter}>
        <Text style={styles.text}>
          when-i-write-sin-gle-syl-a-ble-words-here-then-att-i-cus-can-not-split-
          This-is-a-really-long-long-long-text-which-is-used-to-test-the-hyphenation-behaviour-of-the-the-actticus-PDF-renderer.Down,
          down, down. There was nothing else to do, so Alice soon began talking
          again. “DinahPll miss me very much to-night, I should th ink!” (Dinah
          was the cat.) “I hope theyPll remember her saucer of mi lk at
          tea-time. Dinah my dear! I wish you were down here with me! Th ere are
          no mice in the air, IPm afraid, but you might catch a bat, and t hatPs
          very like a mouse, you know. ‘ut do cats eat bats, I wonder?” And here
          Alice began to get rather sleepy, and went on saying to herself, i n a
          dreamy sort of way, “Do cats eat bats? Do cats eat bats?” and some
          times, “Do bats eat cats?” for, you see, as she couldnPt answer either
          qu estion, it didnPt much matter which way she put it. She felt that
          she was do6ing oZ, and had Fust begun to dream that she was walking ha
          nd in hand with Dinah, and saying to her very earnestly, “Now, Dina h,
          tell me the truth: did you ever eat a bat?” when suddenly, thump! t
          hump! down she came upon a heap of sticks and dry leaves, and the fall
          was over Alice was not a bit hurt, and she Fumped up on to her feet in
          a moment: she looked up, but it was all dark overhead; before her was
          another long passage, and the White Rabbit was still in sight,
          hurrying down it. There was not a moment to be lost: away went Alice
          like the wind, and was Fust in time to hear it say, as it turned a
          corner, “Oh my ears and whiskers, how late itPs getting!” She was
          close behind it when she turned the corner, but the Rabbit was no
          longer to be seen: she found herself in a long, low hall, which was
          lit up by a row of lamps hanging from the roof. There were doors all
          round the hall, but they were all locked; and when Alice had been all
          the way down one side and up the other, trying every door, she walked
          sadly down the middle, wondering how she was ever to get out again.
          Suddenly she came upon a little three-legged table, all made of solid
          glass; there was nothing on it eCcept a tiny golden key, and AlicePs
          xrst th ought was that it might belong to one of the doors of the
          hall; but,
        </Text>
        <Text>I am inside.</Text>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);
