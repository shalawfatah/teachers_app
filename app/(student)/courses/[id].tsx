import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Text, IconButton, Card, Chip, Button, List } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

// Import your data
import { placeholderCourses } from "@/utils/placeholder_courses";

export default function SingleCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  // Find the specific course based on the ID from the URL
  const course = placeholderCourses.find((c) => c.id === id);

  // Handle the case where the course doesn't exist
  if (!course) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text variant="headlineSmall">Course not found</Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* --- Hero Header --- */}
        <ImageBackground
          source={{ uri: course.thumbnail }}
          style={styles.heroImage}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
          >
            <IconButton
              icon="arrow-left"
              iconColor="white"
              size={24}
              onPress={() => router.back()}
              style={styles.backButton}
            />

            <View style={styles.heroContent}>
              <View style={styles.badgeRow}>
                <Chip textStyle={styles.chipText} style={styles.categoryChip}>
                  COURSE ID: {course.id}
                </Chip>
              </View>

              <Text variant="headlineMedium" style={styles.title}>
                {course.title}
              </Text>

              <View style={styles.metaRow}>
                <IconButton
                  icon="play-circle-outline"
                  iconColor="white"
                  size={20}
                  style={{ margin: 0 }}
                />
                <Text style={styles.metaText}>
                  {course.video_count} Lessons
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* --- Course Content --- */}
        <View style={styles.contentBody}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            About this course
          </Text>
          <Text variant="bodyMedium" style={styles.descriptionText}>
            {course.description}. This comprehensive program covers everything
            you need to master the subject with hands-on projects and expert
            guidance.
          </Text>

          <View style={styles.curriculumHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Curriculum
            </Text>
            <Text style={styles.lessonCount}>{course.video_count} videos</Text>
          </View>

          {/* Mocking the lesson list since we're using course data */}
          {[1, 2, 3].map((_, index) => (
            <Card key={index} style={styles.lessonCard}>
              <List.Item
                title={`Module ${index + 1}: Getting Started`}
                description="12:45 • High Definition"
                titleStyle={styles.lessonTitle}
                left={() => (
                  <View style={styles.lessonNumber}>
                    <Text style={styles.lessonNumberText}>{index + 1}</Text>
                  </View>
                )}
                right={() => (
                  <IconButton icon="play-circle" iconColor="#6200ee" />
                )}
              />
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* --- Sticky Bottom Action --- */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          style={styles.primaryButton}
          contentStyle={{ height: 56 }}
          labelStyle={styles.buttonLabel}
          onPress={() => console.log("Starting course:", course.id)}
        >
          Start Learning
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  heroImage: { height: 320 },
  gradient: { flex: 1, justifyContent: "space-between", padding: 16 },
  backButton: {
    marginTop: 40,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 12,
  },
  heroContent: { marginBottom: 20 },
  badgeRow: { flexDirection: "row", marginBottom: 8 },
  categoryChip: { backgroundColor: "#6200ee" },
  chipText: { color: "white", fontWeight: "bold", fontSize: 10 },
  title: { color: "white", fontWeight: "bold", letterSpacing: -0.5 },
  metaRow: { flexDirection: "row", alignItems: "center", marginLeft: -8 },
  metaText: { color: "white", fontSize: 14, fontWeight: "500" },
  contentBody: {
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    backgroundColor: "#fff",
  },
  descriptionText: {
    color: "#666",
    lineHeight: 22,
    marginBottom: 32,
  },
  curriculumHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  lessonCount: {
    color: "#6200ee",
    fontWeight: "600",
  },
  sectionTitle: { fontWeight: "800", color: "#1a1a1a" },
  lessonCard: {
    marginBottom: 12,
    backgroundColor: "#f8f9fa",
    elevation: 0,
    borderRadius: 16,
  },
  lessonTitle: { fontWeight: "600" },
  lessonNumber: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginLeft: 8,
  },
  lessonNumberText: { color: "#1a1a1a", fontWeight: "bold" },
  footer: {
    padding: 20,
    paddingBottom: 34, // Padding for safe area/home indicator
    backgroundColor: "white",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  primaryButton: { borderRadius: 16, backgroundColor: "#6200ee" },
  buttonLabel: { fontSize: 16, fontWeight: "bold", textTransform: "none" },
});
