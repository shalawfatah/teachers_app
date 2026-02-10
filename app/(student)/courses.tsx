import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  Card,
  Chip,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import { useState, useEffect } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_count: number;
}

export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch courses from Supabase
    // For now, using placeholder data
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  // Placeholder courses
  const placeholderCourses = [
    {
      id: "1",
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      video_count: 24,
    },
    {
      id: "2",
      title: "React Native Masterclass",
      description: "Build mobile apps with React Native",
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
      video_count: 18,
    },
    {
      id: "3",
      title: "Advanced JavaScript",
      description: "Deep dive into modern JavaScript concepts",
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
      video_count: 32,
    },
  ];

  const renderCourse = ({ item }: { item: Course }) => (
    <Card
      style={styles.courseCard}
      onPress={() => console.log("Course pressed", item.id)}
    >
      <Card.Cover source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Card.Content style={styles.cardContent}>
        <Text
          variant="titleMedium"
          style={styles.courseTitle}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          variant="bodyMedium"
          style={styles.courseDescription}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={styles.courseFooter}>
          <Chip icon="play-circle" style={styles.chip}>
            {item.video_count} videos
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          All Courses
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Explore and learn from available courses
        </Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search courses..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {/* Courses List */}
      <FlatList
        data={placeholderCourses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#666",
  },
  searchContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchbar: {
    elevation: 0,
    backgroundColor: "#f5f5f5",
  },
  listContent: {
    padding: 16,
  },
  courseCard: {
    marginBottom: 16,
    elevation: 2,
  },
  thumbnail: {
    height: 180,
  },
  cardContent: {
    paddingTop: 12,
  },
  courseTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseDescription: {
    color: "#666",
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    alignSelf: "flex-start",
  },
});
