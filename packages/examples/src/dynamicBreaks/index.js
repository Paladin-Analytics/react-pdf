import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@surge-global-engineering/rpdf-renderer';

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontFamily: 'Oswald',
    textAlign: 'justify',
    fontSize: 18,
    lineHeight: 1.5,
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

export default () => (
  <Document>
    <Page size="A4">
      <Text style={styles.text} debug>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum. Lorem ipsum dolor sit amet, consectetur adipisicing
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum.Lorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum.Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum.Lorem ipsum dolor sit
        amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. asonhtu sanotheu snatoeh usnatoeh
        usnatoehu snatoehu snaothe usnaoth eusnatohe commodo consequat. Duis
        aute irure dolor in reprehenderit in voluptate velit esse cillum.Lorem
        ipsum dolor, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. asonhtu sanotheu snatoeh
        usnatoehsit amet, consectetur adipisicing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. asonhtu sanotheu snatoeh
        usnatoeh sanhoeusntaohe
      </Text>
      <View style={styles.ornamental} debug breakIfLastOnPage>
        <Text>****</Text>
      </View>
      {/* <Image src="https://react-pdf.org/images/quijote1.jpg" /> */}
      <View>
        <Text style={styles.text} debug>
          asnoeuth asnoehu sanotehu snaotehu santoehu sntaoheu sntaohe usnatohe
          usntaohe usntaohe suntaohe usnthaoeusn sanaoseth santoheu sntaoh
          nsaoteh usntaho eusntha oesnuth aosneut hasonetu eusnthao esunthao
          esunthao esnuth aosnetuh usntaohe usntaohe suntaohe usnthaoeusn
          sanaoseth santoheu sntaoh nsaoteh usntaho eusntha oesnuth aosneut
          hasonetu eusnthao esunthao esunthao esnuth aosnetuhsit amet
        </Text>
      </View>
    </Page>
  </Document>
);
