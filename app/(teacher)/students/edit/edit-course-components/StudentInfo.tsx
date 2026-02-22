import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/student_edit_styles";

interface Props {
  student: {
    name: string;
    email: string;
    grade?: string | number;
  };
}

export default function StudentInfo({ student }: Props) {
  return (
    <View>
      <Text variant="titleMedium" style={styles.sectionTitle}>
        Student Information
      </Text>

      {[
        { label: "Full Name", value: student.name },
        { label: "Email Address", value: student.email },
        { label: "Grade", value: student.grade || "N/A" },
      ].map((item, index) => (
        <View key={index} style={{ marginBottom: 16 }}>
          <Text variant="labelLarge" style={{ marginBottom: 4 }}>
            {item.label}
          </Text>
          <Text variant="bodyLarge">{item.value}</Text>
        </View>
      ))}
    </View>
  );
}
