import { View, StyleSheet} from "react-native";
import Svg, {
  Path,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from "react-native-svg";

const BrushBackground = ({ colors = ["#3b3f46", "#DECA57"] }) => (
  <View style={StyleSheet.absoluteFill}>
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <Defs>
        <SvgGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={colors[0]} />
          <Stop offset="100%" stopColor={colors[1]} />
        </SvgGradient>
      </Defs>
      <Path
        d="M0,15 Q10,2 50,8 T100,12 L98,85 Q90,98 50,92 T2,82 Z"
        fill="url(#brushGradient)"
      />
    </Svg>
  </View>
);

export default BrushBackground;
