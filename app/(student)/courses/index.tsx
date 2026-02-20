import { View, FlatList, RefreshControl } from "react-native";
import { Text, Searchbar, IconButton, Badge } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import { courses_styles } from "@/styles/courses";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import { renderCourse } from "@/components/courses/Card";
import FilterModal from "@/components/courses/FilterModal";
import { FilterState } from "@/types/modal";

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterState>({ grades: [] });

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("courses")
        .select(
          `
          *,
          teachers (name)
        `,
        )
        .order("created_at", { ascending: false });

      // Apply Grade Filters if any are selected
      if (filters.grades.length > 0) {
        query = query.in("grade", filters.grades);
      }

      // Apply Search Filter
      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, searchQuery]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCourses();
  };

  const getActiveFilterCount = () => filters.grades.length;

  if (loading && !refreshing) return <Loader />;

  return (
    <View style={courses_styles.container}>
      <View style={courses_styles.header}>
        <View style={courses_styles.headerRow}>
          <View style={courses_styles.headerTextContainer}>
            <Text variant="headlineMedium" style={courses_styles.headerTitle}>
              هەموو خولەکان
            </Text>
            <Text variant="bodyMedium" style={courses_styles.headerSubtitle}>
               خولی بەردەست {courses.length}
            </Text>
          </View>

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
          placeholder="گەڕان بۆ خول..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={courses_styles.searchbar}
        />
      </View>

      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={courses_styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            هیچ خولێک دانەنراوە
          </Text>
        }
      />

      <FilterModal
        visible={filterVisible}
        onDismiss={() => setFilterVisible(false)}
        onApply={setFilters}
        currentFilters={filters}
      />
    </View>
  );
}
