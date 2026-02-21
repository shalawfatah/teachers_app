import React from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "@/styles/single_course_styles";
import NoCourse from "@/components/courses/NoCourse";
import Loader from "@/components/Loader";
import { useCourseData } from "./single-course-components/use-course-data";
import { CourseHero } from "./single-course-components/course-hero";
import { CourseContent } from "./single-course-components/course-content";

export default function SingleCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { course, videos, isVerified, loading, canPlayVideo } = useCourseData(
    id as string,
  );

  const handleVideoPress = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  const handleStartCourse = () => {
    const firstPlayable = videos.find((v) => canPlayVideo(v));
    if (firstPlayable) {
      handleVideoPress(firstPlayable.id);
    }
  };

  if (loading) return <Loader />;
  if (!course) return <NoCourse />;

  const hasPlayableVideos = videos.some((v) => canPlayVideo(v));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <CourseHero
          course={course}
          videosCount={videos.length}
          isVerified={isVerified}
          onBack={() => router.back()}
        />

        <CourseContent
          course={course}
          videos={videos}
          isVerified={isVerified}
          canPlayVideo={canPlayVideo}
          onVideoPress={handleVideoPress}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          style={styles.primaryButton}
          contentStyle={{ height: 56 }}
          labelStyle={styles.buttonLabel}
          onPress={handleStartCourse}
          disabled={videos.length === 0 || !hasPlayableVideos}
        >
          دەستپێکی خول
        </Button>
      </View>
    </View>
  );
}
