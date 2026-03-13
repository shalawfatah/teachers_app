import React from "react";
import { Text, SegmentedButtons } from "react-native-paper";
import { View } from "react-native";
import { styles } from "@/styles/student_edit_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  verified: boolean;
  onStatusChange: (status: boolean) => void;
}

export default function StatusToggle({ verified, onStatusChange }: Props) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View>
      <View style={{ direction: "rtl" }}>
        <Text variant="labelLarge" style={[styles.label, { marginTop: 20 }]}>
          {text.video_play_permission}
        </Text>
        <Text variant="bodySmall" style={{ marginBottom: 12, color: "#666" }}>
          {text.video_play_permission_text}
        </Text>
      </View>
      <SegmentedButtons
        value={verified ? "active" : "inactive"}
        onValueChange={(value) => onStatusChange(value === "active")}
        buttons={[
          {
            value: "inactive",
            label: text.no_permission,
            icon: "close-circle",
          },
          {
            value: "active",
            label: text.have_permission,
            icon: "check-circle",
          },
        ]}
        style={styles.segmented}
      />
    </View>
  );
}
