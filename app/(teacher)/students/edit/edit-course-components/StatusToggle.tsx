import React from "react";
import { Text, SegmentedButtons } from "react-native-paper";
import { styles } from "@/styles/student_edit_styles";

interface Props {
  verified: boolean;
  onStatusChange: (status: boolean) => void;
}

export const StatusToggle = ({ verified, onStatusChange }: Props) => (
  <>
    <Text variant="labelLarge" style={[styles.label, { marginTop: 20 }]}>
      Account Status
    </Text>
    <Text variant="bodySmall" style={{ marginBottom: 12, color: "#666" }}>
      Control whether this student can access the platform
    </Text>

    <SegmentedButtons
      value={verified ? "active" : "inactive"}
      onValueChange={(value) => onStatusChange(value === "active")}
      buttons={[
        { value: "active", label: "Verified", icon: "check-circle" },
        { value: "inactive", label: "Unverified", icon: "close-circle" },
      ]}
      style={styles.segmented}
    />
  </>
);
