import React from 'react';
import {
  Document,
  Font,
  Page,
  Text,
  Image,
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
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
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
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
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
  absolute: {
    position: 'absolute',
    width: '100%',
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

const Float = ({ children, direction, ...props }) => (
  <>
    <View fillPreviousWrapTextSpacing />
    <View hasWrapTextAroundComponent {...props}>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          alignItems: direction === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        <View wrapTextAround>{children}</View>
      </View>
    </View>
  </>
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
        <Float direction="left">
          <Text style={{ fontSize: 32, paddingRight: 5, lineHeight: 0.9 }}>
            L
          </Text>
        </Float>

        <Text style={styles.text}>
          when-i-write-sin-gle-syl-a-ble-words-here-then-att-i-cus-can-not-split
          uego volvía diciendo, como si verdaderamente fuera enamorado: —¡Oh
          princesa Dulcinea, señora deste cautivo corazón! Mucho agravio me
          habedes fecho en despedirme y reprocharme con el riguroso afincamiento
          de mandarme no parecer ante la vuestra fermosura. Plégaos, señora, de
          membraros deste vuestro sujeto corazón, que tantas cuitas por vuestro
          amor padece. Con estos iba ensartando otros disparates, todos al modo
          de los que sus libros le habían enseñado, Plégaos, señora, de done
          done done Es, pues, de saber, que este sobredicho hidalgo, los ratos
          que estaba ocioso (que eran los más del año) se daba a leer libros de
          caballerías Es, pues, de saber, que este sobredicho hidalgo, los ratos
          que estaba ocioso (que eran los más del año) se daba a leer libros de
          caballerías
          <Text>I am inside.</Text>
        </Text>
        <Float direction="right">
          <Image
            style={[{ marginLeft: 5, width: 300 }]}
            src="http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg"
          />
        </Float>

        <Text style={[styles.text, { textIndent: 5 }]}>
          Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
          ocioso (que eran los más del año) se daba a leer libros de
          caballerías. Es, pues, se daba a leer libros de caballerías.
        </Text>

        <Float direction="left">
          <Image
            style={[{ marginRight: 5, width: 300 }]}
            src="http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg"
          />
        </Float>

        <Text style={styles.text}>
          Superman ara comprar libros de caballerías en que leer; y así llevó a
          su casa todos cuantos pudo haber dellos; y de todos ningunos le
          parecían tan bien como los que compuso el famoso Feliciano de Silva:
          porque la claridad de su prosa, y aquellas intrincadas razones suyas,
          le parecían de perlas; y más cuando llegaba a leer aquellos requiebros
          y cartas de desafío, donde en muchas partes hallaba escrito: la razón.
        </Text>
      </View>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);
