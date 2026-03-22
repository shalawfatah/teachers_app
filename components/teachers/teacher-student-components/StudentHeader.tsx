import React from "react";
import { StyleSheet, View } from "react-native";
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
          mode="bar"
          onChangeText={onSearchChange}
          value={searchQuery}
          elevation={0}
          iconColor="rgba(255,255,255,0.6)"
          inputStyle={headerStyles.input}
          style={[headerStyles.searchbar, { direction: isRTL ? "rtl" : "ltr" }]}
          placeholderTextColor="rgba(255,255,255,0.4)"
          icon={isRTL ? undefined : "magnify"}
        />
      </View>
    </>
  );
}

const headerStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
  },
  searchbar: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    height: 50,
  },
  input: {
    color: "#FFF",
    fontFamily: "Goran",
    fontSize: 15,
    paddingBottom: 2, // Fine-tune vertical alignment
  },
});
