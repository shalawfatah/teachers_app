import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface RavaTextProps {
  text: string;
  placement: "right" | "left" | "center";
}

export default function RavaSubtitle({ text, placement }: RavaTextProps) {
  return (
    <Text
      variant="bodyMedium"
      style={[
        headerStyles.subtitle,
        {
          textAlign: placement,
        },
      ]}
    >
      {text}
    </Text>
  );
}

const headerStyles = StyleSheet.create({
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: style_vars.PRIMARY_FONT,
    letterSpacing: 0.2,
  },
});
