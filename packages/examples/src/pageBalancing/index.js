import React from 'react';
import {
  Document,
  Page,
  Text,
  Font,
  StyleSheet,
} from '@surge-global-engineering/rpdf-renderer';

const styles = StyleSheet.create({
  page: {
    marginTop: 10,
  },
  text: {
    marginBottom: 12,
    fontFamily: 'Oswald',
    textAlign: 'left',
    fontSize: 12,
    lineHeight: 1.5,
    dynamicLetterSpacing: true,
  },
  ornamental: {
    fontSize: 36,
    margin: '10px 10px 40px 10px',
  },
  bold: {
    fontWeight: 400,
  },
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});

export default () => (
  <Document>
    <Page size={{ width: '12.7cm', height: '20.32cm' }} style={styles.page}>
      <Text style={styles.text} debug>
        The atmosphere near the surface of Jupiter is about 88 to 92% hydrogen,
        8 to 12% helium, and 1% other gases. The lower atmosphere is so heated
        and the pressure so high that helium changes to liquid. It rains down
        onto the planet.[26] Based on spectroscopy, Jupiter seems to be made of
        the same gases as Saturn. It is different from Neptune or Uranus. Those
        two planets have much less hydrogen and helium gas.[27] The very high
        temperatures and pressures in Jupiter&apos;s core mean scientists cannot
        tell what materials are there. This cannot be found out, because it is
        not possible to create the same amount of pressure on Earth. Above the
        unknown inner core is an outer core. The outer core of Jupiter is thick,
        liquid hydrogen.[28] The pressure is high enough to make the hydrogen
        solid, but then it melts because of the heat. The planet Jupiter is
        sometimes called a failed star because it is made of the same elements
        (hydrogen and helium) as is the Sun, but it is not large enough to have
        the internal pressure and temperature necessary to cause hydrogen to
        fuse to helium, the energy source that powers the sun and most other
        stars. The planet Jupiter is sometimes called a failed star because it
        is made of the same elements (hydrogen and helium) as is the Sun, but it
        is not large enough.
      </Text>

      <Text style={styles.text} debug>
        Jupiter is twice as massive as all the other planets in the Solar System
        put together.[17] It gives off more heat than it gets from the sun.[30]
        Jupiter is 11 times the width of Earth and 318 times as massive. The
        volume of Jupiter is 1,317 times the volume of Earth. In other words,
        1,317 Earth-sized objects could fit inside it.[31]
      </Text>

      <Text style={styles.text} debug>
        Jupiter has many bands of clouds going horizontally across its surface.
        The light parts are zones and the darker are belts. The zones and belts
        often interact with each other. This causes huge storms. Wind speeds of
        360 kilometres per hour (km/h) are common on Jupiter.[32] To show the
        difference the strongest tropical storms on Earth are about 100
        km/h.[33] Most of the clouds on Jupiter are made of ammonia.[34] There
        may also be clouds of water vapor like clouds on Earth. Spacecrafts such
        as Voyager 1 have seen lightning on the surface of the planet.
        Scientists think it was water vapor because lightning needs water
        vapor.[35] These lightning bolts have been measured as up 1,000 times as
        powerful as those on Earth.[35] The brown and orange colors are caused
        when sunlight passes through or refracts with the many gases in the
        atmosphere.
      </Text>

      <Text style={styles.text} debug>
        One of the biggest features in Jupiter&apos;s atmosphere is the Great
        Red Spot. It is a huge storm which is bigger than the entire Earth. It
        is on record since at least 1831,[36] and as early as 1665.[37][38]
        Images by the Hubble Space Telescope have shown as many as two smaller
        &quot;red spots&quot; next to the Great Red Spot.[39][40] Storms can
        last for hours or as long as hundreds of years in the case of the Great
        Red Spot.[41][42]
      </Text>

      <Text style={styles.text} debug>
        Jupiter has a magnetic field like Earth&apos;s but 11 times
        stronger.[43] It also has a magnetosphere much bigger and stronger than
        Earth&apos;s. The field traps radiation belts much stronger than
        Earth&apos;s Van Allen radiation belts, strong enough to endanger any
        spacecraft travelling past or to Jupiter. The magnetic field is probably
        caused by the large amounts of liquid metallic hydrogen in the core of
        Jupiter.[44] The four largest moons of Jupiter and many of the smaller
        ones orbit or go around the planet within the magnetic field. This
        protects them from the solar wind. Jupiter&apos;s magnetic field is so
        large, it reaches the orbit of Saturn 7.7 million miles (12 million km)
        away.[45] The Earth&apos;s magnetosphere does not even cover its moon,
        less than a quarter of a million miles (400,000 km) away. It also
        experiences large aurorae, which happen when charged particles from the
        volcanic moon Io land in its atmosphere.
      </Text>

      <Text style={styles.text} debug>
        Jupiter also has a thin planetary ring system.[46] These rings are
        difficult to see and were not discovered until 1979 by NASA&apos;s
        Voyager 1 probe.[47] There are four parts to Jupiter&apos;s rings. The
        closest ring to Jupiter is called the Halo Ring.[48] The next ring is
        called the Main Ring. It is about 6,440 km (4,002 mi) wide and only 30
        km (19 mi) thick.[48] The Main and Halo rings of Jupiter are made of
        small, dark particles.[47] The third and fourth rings, called the
        Gossamer Rings, are transparent (see through) and are made from
        microscopic debris and dust.[47] This dust probably comes from small
        meteors striking the surface of Jupiter&apos;s moons. The third ring is
        called the Amalthea Gossamer Ring, named after moon Amalthea. The outer
        ring, the Thebe Gossamer Ring, is named after the moon Thebe. The outer
        edge of this ring is about 220,000 km (136,702 mi) from Jupiter.[48]
      </Text>
    </Page>
  </Document>
);
