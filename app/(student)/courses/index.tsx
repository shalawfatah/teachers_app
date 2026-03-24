import React from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import Loader from "@/components/Loader";
import { renderCourse } from "@/components/courses/Card";
import CourseHeader from "../../../components/courses/single-course-components/CourseHeader";
import useCourses from "../../../components/courses/single-course-components/use-courses";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";

export default function CoursesScreen() {
  const c = useCourses();
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  if (c.loading && !c.refreshing) return <Loader />;

  return (
    <LinearGradient colors={gradient_colors} style={{ flex: 1 }}>
      <BackgroundShapes />

      <View
        style={[gridStyles.container, { direction: isRTL ? "rtl" : "ltr" }]}
      >
        <CourseHeader
          courseCount={c.courses.length}
          searchQuery={c.searchQuery}
          onSearchChange={c.setSearchQuery}
          filters={c.filters}
          onOpenFilter={() => c.setFilterVisible(true)}
        />

        <FlatList
          key={"two-column-grid"}
          data={c.courses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={gridStyles.row}
          contentContainerStyle={gridStyles.listContent}

          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={c.refreshing}
              onRefresh={c.onRefresh}
              tintColor="#FFF"
            />
          }
          ListEmptyComponent={
            <View style={gridStyles.emptyContainer}>
              <Text style={gridStyles.emptyText}>
                {text.no_course_registered}
              </Text>
            </View>
          }
        />
      </View>
    </LinearGradient>
  );
}

const gridStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  listContent: {
    paddingHorizontal: 8, // Half of the gap to balance the outer edges
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between", // Pushes the two books to the edges
    paddingHorizontal: 8,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
  },
});
