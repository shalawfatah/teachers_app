import { useLanguage } from "@/contexts/LanguageContext";
import { style_vars } from "@/utils/style_vars";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function RavaLabel({ label }: { label: string }) {
  const { isRTL } = useLanguage();
  return (
    <Text
      variant="bodyMedium"
      style={[styles.fieldLabel, { textAlign: isRTL ? "right" : "left" }]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontFamily: style_vars.PRIMARY_FONT,
    marginBottom: 6,
    paddingHorizontal: 4,
  },
});
