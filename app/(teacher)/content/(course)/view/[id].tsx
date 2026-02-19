import React, { useEffect, useState } from "react";
import { ScrollView, View, Image } from "react-native";
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
import { ExtendedCourse } from "@/types/courses";
import { styles } from "@/styles/content_single_styles";

export default function ViewCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [videos, setVideos] = useState<any[]>([]);
  const [course, setCourse] = useState<ExtendedCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select(`*, teachers(name), videos(*)`)
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

        <View style={styles.lessonsHeader}>
          <Text variant="titleLarge">Course Content</Text>
        </View>

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
