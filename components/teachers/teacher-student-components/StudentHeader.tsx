import React from "react";
import { View } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { styles } from "@/styles/teacher_students_styles";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function StudentHeader({ searchQuery, onSearchChange }: Props) {
  const { lang, t } = useLanguage();
  const general = lang === 1 ? t.general_eng : t.general_krd;
  return (
    <>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          {general.students}
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          {general.manage_students}
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder={general.search}
          onChangeText={onSearchChange}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>
    </>
  );
}
