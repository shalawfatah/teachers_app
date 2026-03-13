import React from "react";
import { View } from "react-native";
import { Text, Searchbar, IconButton, Badge } from "react-native-paper";
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
  filters,
  onOpenFilter,
}: Props) {
  const filterCount = filters.grades.length;
  const { lang } = useLanguage();
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

          <View style={courses_styles.filterButtonContainer}>
            <IconButton
              icon="filter-variant"
              mode="contained"
              size={24}
              onPress={onOpenFilter}
              style={courses_styles.filterButton}
            />
            {filterCount > 0 && (
              <Badge style={courses_styles.filterBadge}>{filterCount}</Badge>
            )}
          </View>
        </View>
      </View>

      <View style={courses_styles.searchContainer}>
        <Searchbar
          placeholder={text.search}
          onChangeText={onSearchChange}
          value={searchQuery}
          style={courses_styles.searchbar}
        />
      </View>
    </>
  );
}
