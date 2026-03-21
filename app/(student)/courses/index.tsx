import React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { Text } from "react-native-paper";
import { courses_styles } from "@/styles/courses";
import Loader from "@/components/Loader";
import { renderCourse } from "@/components/courses/Card";
import CourseHeader from "../../../components/courses/single-course-components/CourseHeader";
import useCourses from "../../../components/courses/single-course-components/use-courses";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";

export default function CoursesScreen() {
  const c = useCourses();
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  if (c.loading && !c.refreshing) return <Loader />;

  return (
    <LinearGradient colors={gradient_colors} style={{ flex: 1 }}>
      <View
        style={[courses_styles.container, { direction: isRTL ? "rtl" : "ltr" }]}
      >
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
          ListEmptyComponent={<Text>{text.no_course_registered}</Text>}
        />
      </View>
    </LinearGradient>
  );
}
