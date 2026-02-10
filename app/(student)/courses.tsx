import { View, FlatList } from "react-native";
import {
  Text,
  Card,
  Chip,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import { useState, useEffect } from "react";
import { courses_styles } from "@/styles/courses";
import { placeholderCourses } from "@/utils/placeholder_courses";
import { Course } from "@/types/courses";

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

    const renderCourse = ({ item }: { item: Course }) => (
    <Card
      style={courses_styles.courseCard}
      onPress={() => console.log("Course pressed", item.id)}
    >
      <Card.Cover source={{ uri: item.thumbnail }} style={courses_styles.thumbnail} />
      <Card.Content style={courses_styles.cardContent}>
        <Text
          variant="titleMedium"
          style={courses_styles.courseTitle}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          variant="bodyMedium"
          style={courses_styles.courseDescription}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={courses_styles.courseFooter}>
          <Chip icon="play-circle" style={courses_styles.chip}>
            {item.video_count} videos
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={courses_styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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


