import React from "react";
import { View } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { styles } from "@/styles/teacher_students_styles";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { StudentHeaderProps } from "@/types/students";

export default function StudentHeader({
  searchQuery,
  onSearchChange,
}: StudentHeaderProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          {text.students}
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          {text.manage_students}
        </Text>
      </View>

      <View
        style={[styles.searchContainer, { direction: isRTL ? "rtl" : "ltr" }]}
      >
        <Searchbar
          placeholder={text.search}
          onChangeText={onSearchChange}
          value={searchQuery}
          style={[styles.searchbar, { direction: isRTL ? "rtl" : "ltr" }]}
          iconColor="#FFF"
          placeholderTextColor="#FFF"
          inputStyle={{ color: "#FFF" }}
        />
      </View>
    </>
  );
}
