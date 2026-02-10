import { View, FlatList } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { courses_styles } from "@/styles/courses";
import { placeholderCourses } from "@/utils/placeholder_courses";
import Loader from "@/components/Loader";
import { renderCourse } from "@/components/courses/Card";

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <Loader />;

  return (
    <View style={courses_styles.container}>
      <View style={courses_styles.header}>
        <Text variant="headlineMedium" style={courses_styles.headerTitle}>
          All Courses
        </Text>
        <Text variant="bodyMedium" style={courses_styles.headerSubtitle}>
          Explore and learn from available courses
        </Text>
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
    </View>
  );
}
