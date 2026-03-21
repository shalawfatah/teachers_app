import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import NoCourse from "@/components/courses/NoCourse";
import Loader from "@/components/Loader";
import CourseContent from "@/components/courses/single-course-components/course-content";
import CourseHero from "@/components/courses/single-course-components/course-hero";
import useCourseData from "@/components/courses/single-course-components/use-course-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { gradient_colors } from "@/utils/gradient_colors";

export default function SingleCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { course, videos, isVerified, loading, canPlayVideo } = useCourseData(
    id as string,
  );
  const { isRTL } = useLanguage();

  const handleVideoPress = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

    if (loading) return <Loader />;
  if (!course) return <NoCourse />;

  return (
    <LinearGradient colors={gradient_colors} style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <View style={{ flex: 1, direction: isRTL ? "rtl" : "ltr" }}>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "transparent" }}
          contentContainerStyle={{
            paddingBottom: 180,
          }}
        >
          <CourseHero
            course={course}
            videosCount={videos.length}
            isVerified={isVerified}
            onBack={() => router.back()}
          />

          <CourseContent
            course={course}
            videos={videos}
            canPlayVideo={canPlayVideo}
            onVideoPress={handleVideoPress}
          />
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
