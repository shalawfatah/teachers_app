import React from "react";
import { View, ScrollView, ImageBackground, StatusBar } from "react-native";
import { Text, IconButton, Card, Chip, Button, List } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { placeholderCourses } from "@/utils/placeholder_courses";
import { styles } from "@/styles/single_course_styles";
import NoCourse from "@/components/courses/NoCourse";

export default function SingleCourse() {
  const { id } = useLocalSearchParams();
  const course = placeholderCourses.find((c) => c.id === id);

  const router = useRouter();

  if (!course) return <NoCourse />;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
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
