import React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import { courses_styles } from "@/styles/courses";
import Loader from "@/components/Loader";
import { renderCourse } from "@/components/courses/Card";
import FilterModal from "@/components/courses/FilterModal";
import CourseHeader from "../../../components/courses/single-course-components/CourseHeader";
import useCourses from "../../../components/courses/single-course-components/use-courses";

export default function CoursesScreen() {
  const c = useCourses();

  if (c.loading && !c.refreshing) return <Loader />;

  return (
    <View style={courses_styles.container}>
      <CourseHeader
        courseCount={c.courses.length}
        searchQuery={c.searchQuery}
        onSearchChange={c.setSearchQuery}
        filters={c.filters}
        onOpenFilter={() => c.setFilterVisible(true)}
      />

      <FlatList
        data={c.courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={courses_styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={c.refreshing} onRefresh={c.onRefresh} />
        }
        ListEmptyComponent={<Text>هیچ خولێک دانەنراوە</Text>}
      />

      <FilterModal
        visible={c.filterVisible}
        onDismiss={() => c.setFilterVisible(false)}
        onApply={c.setFilters}
        currentFilters={c.filters}
      />
    </View>
  );
}
