import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/single_course_styles";
import { VideoSingle } from "@/types/videos";
import VideosList from "./video-list";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";

interface CourseContentProps {
  course: {
    description: string;
  };
  videos: VideoSingle[];
  canPlayVideo: (video: VideoSingle) => boolean;
  onVideoPress: (videoId: string) => void;
}

export default function CourseContent({
  course,
  videos,
  canPlayVideo,
  onVideoPress,
}: CourseContentProps) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View style={[styles.contentBody, { direction: isRTL ? "rtl" : "ltr" }]}>
      <BackgroundShapes />
      <Text variant="titleLarge" style={styles.sectionTitle}>
        {text.about_course}
      </Text>
      <Text variant="bodyMedium" style={styles.descriptionText}>
        {course.description}
      </Text>

      <View style={styles.curriculumHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          {text.list_of_videos}
        </Text>
      </View>

      <VideosList
        videos={videos}
        canPlayVideo={canPlayVideo}
        onVideoPress={onVideoPress}
      />
    </View>
  );
}
