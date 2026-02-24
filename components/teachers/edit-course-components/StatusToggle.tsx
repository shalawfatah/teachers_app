import React from "react";
import { Text, SegmentedButtons } from "react-native-paper";
import { View } from "react-native";
import { styles } from "@/styles/student_edit_styles";

interface Props {
  verified: boolean;
  onStatusChange: (status: boolean) => void;
}

export default function StatusToggle({ verified, onStatusChange }: Props) {
  return (
    <View>
      <View style={{ direction: "rtl" }}>
        <Text variant="labelLarge" style={[styles.label, { marginTop: 20 }]}>
          مۆڵەتی بینینی ڤیدیۆ
        </Text>
        <Text variant="bodySmall" style={{ marginBottom: 12, color: "#666" }}>
          ئایا خوێندکار توانای بینینی ڤیدیۆی خولەکانی هەیە؟
        </Text>
      </View>
      <SegmentedButtons
        value={verified ? "active" : "inactive"}
        onValueChange={(value) => onStatusChange(value === "active")}
        buttons={[
          { value: "inactive", label: "مۆڵەتی نیە", icon: "close-circle" },
          { value: "active", label: "مۆڵەتی هەیە", icon: "check-circle" },
        ]}
        style={styles.segmented}
      />
    </View>
  );
}
