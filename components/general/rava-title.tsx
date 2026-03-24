import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

interface RavaTitleProps {
  text: string;
  placement: "right" | "left" | "center";
}

export default function RavaTitle({ text, placement }: RavaTitleProps) {
  return (
    <Text
      variant="headlineMedium"
      style={[
        headerStyles.title,
        {
          textAlign: placement,
          width: "100%",
        },
      ]}
    >
      {text}
    </Text>
  );
}

const headerStyles = StyleSheet.create({
  title: {
    color: "#ffffff",
    fontFamily: style_vars.PRIMARY_FONT,
    fontWeight: "800",
    fontSize: 28,
  },
});
