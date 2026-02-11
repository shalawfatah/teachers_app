import { View, FlatList } from "react-native";
import { Text, Searchbar, IconButton, Badge } from "react-native-paper";
import { useState, useEffect } from "react";
import { courses_styles } from "@/styles/courses";
import { placeholderCourses } from "@/utils/placeholder_courses";
import Loader from "@/components/Loader";
import { renderCourse } from "@/components/courses/Card";
import FilterModal, { FilterState } from "@/components/courses/FilterModal";

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ grades: [] });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    // TODO: Filter courses based on newFilters
    console.log("Applied filters:", newFilters);
  };

  const getActiveFilterCount = () => {
    return filters.grades.length;
  };

  if (loading) return <Loader />;

  return (
    <View style={courses_styles.container}>
      <View style={courses_styles.header}>
        <View style={courses_styles.headerRow}>
          <View style={courses_styles.headerTextContainer}>
            <Text variant="headlineMedium" style={courses_styles.headerTitle}>
              All Courses
            </Text>
            <Text variant="bodyMedium" style={courses_styles.headerSubtitle}>
              Explore and learn from available courses
            </Text>
          </View>

          {/* Filter Button */}
          <View style={courses_styles.filterButtonContainer}>
            <IconButton
              icon="filter-variant"
              mode="contained"
              size={24}
              onPress={() => setFilterVisible(true)}
              style={courses_styles.filterButton}
            />
            {getActiveFilterCount() > 0 && (
              <Badge style={courses_styles.filterBadge}>
                {getActiveFilterCount()}
              </Badge>
            )}
          </View>
        </View>
      </View>

      <View style={courses_styles.searchContainer}>
        <Searchbar
          placeholder="Search courses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={courses_styles.searchbar}
        />
      </View>

      <FlatList
        data={placeholderCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={courses_styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterVisible}
        onDismiss={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
      />
    </View>
  );
}
