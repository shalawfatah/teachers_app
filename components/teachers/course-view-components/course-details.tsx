import React from "react";
import { View } from "react-native";
import { Text, Chip, Divider } from "react-native-paper";
import { styles } from "@/styles/content_single_styles";

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
  return (
    <View style={{ direction: "rtl" }}>
      <View style={styles.metaRow}>
        <Chip icon="school" style={styles.chip}>
          پۆل {grade}
        </Chip>
        <Chip icon="book" style={styles.chip}>
          {subject}
        </Chip>
      </View>

      <Text variant="titleMedium" style={styles.sectionLabel}>
        مامۆستا
      </Text>
      <Text variant="bodyLarge" style={styles.teacherName}>
        {instructor}
      </Text>

      <Divider style={styles.divider} />

      <Text variant="titleMedium" style={styles.sectionLabel}>
        دەربارەی ئەم خولە
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        {description}
      </Text>

      <Divider style={styles.divider} />
    </View>
  );
}
