import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
} from "react-native";
import { ActivityIndicator, Text, Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { ExtendedCourse } from "@/types/courses";
import LessonList from "@/components/teachers/course-view-components/course-list";
import CourseHeader from "@/components/teachers/course-view-components/course-header";
import CourseDetails from "@/components/teachers/course-view-components/course-details";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";

export default function ViewCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [course, setCourse] = useState<ExtendedCourse | null>(null);
  const [loading, setLoading] = useState(true);
  const { height } = useWindowDimensions();

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

  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  if (loading) {
    return (
      <View style={viewStyles.centered}>
        <LinearGradient
          colors={gradient_colors}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  }

  if (!course)
    return (
      <View style={viewStyles.centered}>
        <LinearGradient
          colors={gradient_colors}
          style={StyleSheet.absoluteFill}
        />
        <Text variant="headlineSmall" style={{ color: "#FFF" }}>
          Course not found
        </Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          {text.go_back}
        </Button>
      </View>
    );

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {/* BACKGROUND LAYER - Fixed so it doesn't move when scrolling */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={gradient_colors}
          style={StyleSheet.absoluteFill}
        />
        <BackgroundShapes />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={viewStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. IMAGE HEADER (Usually 3:4 or 16:9) */}
        <CourseHeader title={course.title} thumbnail={course.thumbnail} />

        {/* 2. GLASS CONTENT WRAPPER */}
        <View
          style={[
            viewStyles.glassWrapper,
            { direction: isRTL ? "rtl" : "ltr" },
          ]}
        >
          <CourseDetails
            grade={course.grade}
            subject={course.subject}
            instructor={course.teachers?.name || "Unknown"}
            description={course.description}
          />

          <View style={viewStyles.sectionDivider} />

          <Text style={viewStyles.lessonTitle}>
            {text.course_video} ({course.videos?.length || 0})
          </Text>

          <LessonList videos={course.videos || []} />
        </View>

        {/* Padding for Bottom Tab Bar */}
        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const viewStyles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  glassWrapper: {
    marginTop: -30, // Pull content up over the header image slightly
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
      },
      android: { elevation: 10 },
    }),
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 20,
  },
  lessonTitle: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "NRT-Bold",
    marginBottom: 15,
  },
});
