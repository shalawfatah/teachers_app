import React from "react";
import { StyleSheet } from "react-native";
import Svg, {
  G,
  Path,
  Circle,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

export const BackgroundShapes = () => {
  return (
    <Svg
      viewBox="0 0 800 1200"
      style={StyleSheet.absoluteFill}
      preserveAspectRatio="xMidYMid slice"
    >
      <Defs>
        <LinearGradient id="shape_grad_a" x1="0" x2="1" y1="0" y2="1">
          <Stop offset="0" stopColor="#0FF" stopOpacity="0.2" />
          <Stop offset="1" stopColor="#CF6" stopOpacity="0.2" />
        </LinearGradient>
      </Defs>

      <G fill="none" stroke="#FFF" strokeOpacity="0.12" strokeWidth="1.5">
        <Circle cx="150" cy="150" r="40" stroke="url(#shape_grad_a)" />
        <Path d="M600 100 L630 100 M615 85 L615 115" strokeWidth="2" />
        <Rect
          x="700"
          y="250"
          width="40"
          height="40"
          transform="rotate(45, 720, 270)"
        />

        <Path d="M100 500 L140 460 L180 500 L140 540 Z" />
        <Circle cx="650" cy="550" r="80" strokeOpacity="0.05" strokeWidth="4" />
        <Path d="M400 400 L420 400 M410 390 L410 410" />

        <Path
          d="M150 900 h40 c0-12 8-22 20-22 s20 10 20 22 z"
          stroke="url(#shape_grad_a)"
        />
        <Rect x="550" y="850" width="30" height="30" />
        <Circle
          cx="200"
          cy="1100"
          r="15"
          fill="#FFF"
          fillOpacity="0.05"
          stroke="none"
        />
        <Path d="M600 1050 L640 1000 L680 1050 Z" />

        <Circle cx="400" cy="200" r="2" fill="#FFF" fillOpacity="0.2" />
        <Circle cx="450" cy="800" r="2" fill="#FFF" fillOpacity="0.2" />
        <Circle cx="100" cy="1000" r="2" fill="#FFF" fillOpacity="0.2" />
      </G>
    </Svg>
  );
};
