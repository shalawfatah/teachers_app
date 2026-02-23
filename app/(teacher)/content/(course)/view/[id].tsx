import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, Text, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { ExtendedCourse } from "@/types/courses";
import { styles } from "@/styles/content_single_styles";
import LessonList from "@/components/teachers/course-view-components/course-list";
import CourseHeader from "@/components/teachers/course-view-components/course-header";
import CourseDetails from "@/components/teachers/course-view-components/course-details";

export default function ViewCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator style={styles.loader} size="large" />;
  if (!course)
    return (
      <View style={styles.errorContainer}>
        <Text variant="headlineSmall">Course not found</Text>
        <Button onPress={() => router.back()} style={styles.backBtn}>
          Go Back
        </Button>
      </View>
    );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <CourseHeader title={course.title} thumbnail={course.thumbnail} />
      <View style={styles.content}>
        <CourseDetails
          grade={course.grade}
          subject={course.subject}
          instructor={course.teachers?.name || "Unknown"}
          description={course.description}
        />
        <LessonList videos={course.videos || []} />
      </View>
    </ScrollView>
  );
}
