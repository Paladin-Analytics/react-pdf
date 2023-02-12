import React from 'react';
import { Document, Page, Text, Font, StyleSheet } from '@paladin-analytics/rpdf-renderer';

// const styles = StyleSheet.create({
//   text: {
//     margin: 10,
//     fontFamily: 'Oswald',
//     textAlign: 'justify',
//     fontSize: 18,
//     lineHeight: 1.5,
//   },
//   ornamental: {
//     fontSize: 36,
//     margin: '10px 10px 40px 10px',
//   },
// });

const styles = StyleSheet.create({
  text: {
    textAlign:"justify" , 
    fontSize:12 
  },
  ornamental: {
    fontSize: 36,
    margin: '10px 10px 40px 10px',
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
const arr = Array(1000).fill("1");
export default () => (
  <Document>
    <Page size="A4">
      {arr.map(() => (
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
          venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
          Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
          vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat
          vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra
          quis, feugiat a,
        </Text>
      ))}
    </Page>
  </Document>
);
