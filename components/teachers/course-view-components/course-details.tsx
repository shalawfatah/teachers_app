import React from "react";
import { View } from "react-native";
import { Text, Chip, Divider } from "react-native-paper";
import { styles } from "@/styles/content_single_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  grade: string | number;
  subject: string;
  instructor: string;
  description: string;
}

export default function CourseDetails({
  grade,
  subject,
  instructor,
  description,
}: Props) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <View style={styles.metaRow}>
        <Chip icon="school" style={styles.chip}>
          {text.class} {grade}
        </Chip>
        <Chip icon="book" style={styles.chip}>
          {subject}
        </Chip>
      </View>

      <Text variant="titleMedium" style={styles.sectionLabel}>
        {text.teacher}
      </Text>
      <Text variant="bodyLarge" style={styles.teacherName}>
        {instructor}
      </Text>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionLabel}>
        {text.about_course}
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        {description}
      </Text>

      <Divider style={styles.divider} />
    </View>
  );
}
