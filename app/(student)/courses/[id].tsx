import React from "react";
import {
  View,
  ScrollView,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { styles } from "@/styles/single_course_styles";
import NoCourse from "@/components/courses/NoCourse";
import Loader from "@/components/Loader";
import CourseContent from "@/components/courses/single-course-components/course-content";
import CourseHero from "@/components/courses/single-course-components/course-hero";
import useCourseData from "@/components/courses/single-course-components/use-course-data";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function SingleCourse() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { course, videos, isVerified, loading, canPlayVideo } = useCourseData(
    id as string,
  );
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

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

  // Determine bottom offset based on the Tab Bar height from StudentLayout
  const tabBarHeight = Platform.OS === "ios" ? 90 : 70;

  return (
    <LinearGradient colors={["#FF8C00", "#FF0080"]} style={{ flex: 1 }}>
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
            isVerified={isVerified}
            canPlayVideo={canPlayVideo}
            onVideoPress={handleVideoPress}
          />
        </ScrollView>

        <View style={[footerStyles.footerContainer, { bottom: tabBarHeight }]}>
            <Button
              mode="contained"
              style={[
                styles.primaryButton,
                {
                  backgroundColor: "#FFF",
                  borderRadius: 16,
                },
              ]}
              contentStyle={{ height: 56 }}
              labelStyle={[
                styles.buttonLabel,
                { color: "#000", fontFamily: "NRT-Bold" },
              ]}
              onPress={handleStartCourse}
              disabled={videos.length === 0 || !hasPlayableVideos}
            >
              {text.course_start}
            </Button>
        </View>
      </View>
    </LinearGradient>
  );
}

const footerStyles = StyleSheet.create({
  footerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 16, // Adds breathing room on the sides
  },
  blurWrapper: {
    padding: 16,
    borderRadius: 24, // Rounded "pill" look sits better above a tab bar
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
});
