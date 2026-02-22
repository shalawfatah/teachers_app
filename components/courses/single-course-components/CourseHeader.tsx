import React from "react";
import { View } from "react-native";
import { Text, Searchbar, IconButton, Badge } from "react-native-paper";
import { courses_styles } from "@/styles/courses";
import { FilterState } from "@/types/modal";

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

  return (
    <>
      <View style={courses_styles.header}>
        <View style={courses_styles.headerRow}>
          <View style={courses_styles.headerTextContainer}>
            <Text variant="headlineMedium" style={courses_styles.headerTitle}>
              هەموو خولەکان
            </Text>
            <Text variant="bodyMedium" style={courses_styles.headerSubtitle}>
              خولی بەردەست {courseCount}
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
          placeholder="گەڕان بۆ خول..."
          onChangeText={onSearchChange}
          value={searchQuery}
          style={courses_styles.searchbar}
        />
      </View>
    </>
  );
}
