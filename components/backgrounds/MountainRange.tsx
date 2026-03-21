import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Polygon, G } from "react-native-svg";

export const MountainLandscape = () => {
  // Adjust this to make the shapes more or less "explicit"
  const globalOpacity = 0.2;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        viewBox="0 0 1600 900"
        style={StyleSheet.absoluteFill}
        preserveAspectRatio="xMidYMax slice"
      >
        <G opacity={globalOpacity}>
          <Polygon fill="#cc0000" points="957,450 539,900 1396,900" />
          <Polygon fill="#aa0000" points="957,450 872.9,900 1396,900" />

          <Polygon fill="#d6002b" points="-60,900 398,662 816,900" />
          <Polygon fill="#b10022" points="337,900 398,662 816,900" />

          <Polygon fill="#d9004b" points="1203,546 1552,900 876,900" />
          <Polygon fill="#b2003d" points="1203,546 1552,900 1162,900" />

          <Polygon fill="#d3006c" points="641,695 886,900 367,900" />
          <Polygon fill="#ac0057" points="587,900 641,695 886,900" />

          <Polygon fill="#c4008c" points="1710,900 1401,632 1096,900" />
          <Polygon fill="#9e0071" points="1710,900 1401,632 1365,900" />

          <Polygon fill="#aa00aa" points="1210,900 971,687 725,900" />
          <Polygon fill="#880088" points="943,900 1210,900 971,687" />
        </G>
      </Svg>
    </View>
  );
};
