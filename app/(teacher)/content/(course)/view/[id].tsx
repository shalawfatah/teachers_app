import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import {
  Text,
  Card,
  Chip,
  ActivityIndicator,
  Divider,
  Button,
  IconButton,
  List,
} from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Course } from "@/types/courses";

export default function ViewCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select(
          `
        *,
        teachers ('name'), videos('count')
      `,
        ) // This grabs all videos where course_id matches
        .eq("id", id)
        .single();

      if (error) throw error;

      setCourse(data);
      setVideos(data.videos || []); // Store the videos separately for easy mapping
    } catch (err) {
      console.error("Error fetching course details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="headlineSmall">Course not found</Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          Go Back
        </Button>
      </View>
    );
  }

  const hasThumbnail = course.thumbnail && course.thumbnail.trim().length > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header Image Logic */}
      {hasThumbnail && (
        <Image source={{ uri: course.thumbnail }} style={styles.headerImage} />
      )}

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text variant="headlineMedium" style={styles.title}>
            {course.title}
          </Text>
          <IconButton icon="share-variant" onPress={() => { }} />
        </View>

        <View style={styles.metaRow}>
          <Chip icon="school" style={styles.chip}>
            Grade {course.grade}
          </Chip>
          <Chip icon="book" style={styles.chip}>
            {course.subject}
          </Chip>
        </View>

        <Text variant="titleMedium" style={styles.sectionLabel}>
          Instructor
        </Text>
        <Text variant="bodyLarge" style={styles.teacherName}>
          {course.teachers?.name || "Unknown Teacher"}
        </Text>

        <Divider style={styles.divider} />

        <Text variant="titleMedium" style={styles.sectionLabel}>
          دەربارەی ئەم خولە
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {course.description}
        </Text>

        <Divider style={styles.divider} />

        {/* Content Section Placeholder */}
        <View style={styles.lessonsHeader}>
          <Text variant="titleLarge">Course Content</Text>
          <Text variant="bodySmall">{course.video_count || 0} Lessons</Text>
        </View>

        {/* Placeholder for Video List */}
        {videos.length > 0 ? (
          videos.map((item, index) => (
            <List.Item
              key={item.id}
              title={`${index + 1}. ${item.title}`}
              description={item.duration || "Duration unknown"}
              left={(props) => (
                <List.Icon {...props} icon="play-circle-outline" />
              )}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="chevron-right"
                  onPress={() => {
                    // You can link to your VideoPlayerModal here!
                  }}
                />
              )}
              style={styles.videoItem}
            />
          ))
        ) : (
          <Card style={styles.emptyLessons}>
            <Card.Content>
              <IconButton
                icon="play-box-multiple"
                size={40}
                style={styles.centerIcon}
              />
              <Text style={styles.centerText}>No lessons uploaded yet.</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { paddingBottom: 40 },
  loader: { flex: 1, justifyContent: "center" },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  videoItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
  },
  headerImage: { width: "100%", height: 220 },
  content: { padding: 20 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontWeight: "bold", flex: 1 },
  metaRow: { flexDirection: "row", gap: 8, marginVertical: 12 },
  chip: { backgroundColor: "#f0f0f0" },
  sectionLabel: { marginTop: 16, fontWeight: "bold", color: "#666" },
  teacherName: { marginTop: 4, color: "#1c1c1c" },
  description: { marginTop: 8, lineHeight: 22, color: "#444" },
  divider: { marginVertical: 20 },
  lessonsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 16,
  },
  emptyLessons: {
    marginTop: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 0,
  },
  centerIcon: { alignSelf: "center" },
  centerText: { textAlign: "center", color: "#888", marginBottom: 12 },
  addBtn: { width: 160, alignSelf: "center" },
  backBtn: { marginTop: 20 },
});
