import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Svg, { Defs, Rect, Pattern, G } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export const GeometricPattern = () => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width={width} height={height} preserveAspectRatio="xMidYMid slice">
        <Defs>
          {/* Main Texture Pattern (The Greys/Whites) */}
          <Pattern
            id="pixelGrid"
            width="150"
            height="150"
            patternUnits="userSpaceOnUse"
          >
            {/* Background "Dust" - Tiny 2x2 pixels */}
            <Rect
              x="10"
              y="20"
              width="3"
              height="3"
              fill="white"
              fillOpacity="0.15"
            />
            <Rect
              x="50"
              y="80"
              width="3"
              height="3"
              fill="white"
              fillOpacity="0.1"
            />
            <Rect
              x="120"
              y="40"
              width="3"
              height="3"
              fill="white"
              fillOpacity="0.15"
            />
            <Rect
              x="90"
              y="130"
              width="3"
              height="3"
              fill="white"
              fillOpacity="0.05"
            />
          </Pattern>

          {/* Accent Pattern (The Orange Bits) */}
          <Pattern
            id="orangeAccents"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            <G fill="#FF6600" fillOpacity="0.25">
              {/* Larger "Feature" Pixels */}
              <Rect x="50" y="50" width="6" height="6" />
              <Rect x="300" y="150" width="6" height="6" />
              <Rect x="150" y="350" width="6" height="6" />
              <Rect x="350" y="50" width="6" height="6" />
            </G>
          </Pattern>
        </Defs>

        {/* The order of these Rects determines the layering */}
        <Rect width="100%" height="100%" fill="url(#pixelGrid)" />
        <Rect width="100%" height="100%" fill="url(#orangeAccents)" />
      </Svg>
    </View>
  );
};
