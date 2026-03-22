import {style_vars} from "@/utils/style_vars";
import React from "react";
import { View } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { courses_styles } from "@/styles/courses";
import { FilterState } from "@/types/modal";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  courseCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  onOpenFilter: () => void;
}

export default function CourseHeader({
  courseCount,
  searchQuery,
  onSearchChange,
}: Props) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <>
      <View style={courses_styles.header}>
        <View style={courses_styles.headerRow}>
          <View style={courses_styles.headerTextContainer}>
            <Text variant="headlineMedium" style={courses_styles.headerTitle}>
              {text.all_courses}
            </Text>
            <Text variant="bodyMedium" style={courses_styles.headerSubtitle}>
              {text.available_courses} {courseCount}
            </Text>
          </View>
        </View>
      </View>

      <View style={courses_styles.searchContainer}>
        <Searchbar
          placeholder={text.search}
          onChangeText={onSearchChange}
          value={searchQuery}
          iconColor="#ffffff"
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          inputStyle={{
            textAlign: isRTL ? "right" : "left",
            color: "#ffffff",
            fontFamily: style_vars.PRIMARY_FONT,
            paddingHorizontal: 16,
          }}
          style={[
            courses_styles.searchbar,
            {
              flexDirection: isRTL ? "row-reverse" : "row",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              elevation: 0,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
          ]}
          rippleColor="rgba(255, 255, 255, 0.1)"
        />
      </View>
    </>
  );
}
