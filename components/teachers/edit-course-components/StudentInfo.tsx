import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/student_edit_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { StudentInfoProps } from "@/types/students";

export default function StudentInfo({ student }: StudentInfoProps) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        {text.student_information}
      </Text>

      {[
        { label: text.name, value: student.name },
        { label: text.email, value: student.email },
        { label: text.class, value: student.grade || "N/A" },
      ].map((item, index) => (
        <View key={index} style={{ marginBottom: 16 }}>
          <Text variant="labelLarge" style={{ marginBottom: 4, color: "#FFF" }}>
            {item.label}
          </Text>
          <Text variant="bodyLarge" style={{ color: "#FFF" }}>
            {item.value}
          </Text>
        </View>
      ))}
    </View>
  );
}
