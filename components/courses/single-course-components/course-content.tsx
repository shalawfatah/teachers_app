import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "@/styles/single_course_styles";
import { VideoSingle } from "@/types/videos";
import VerificationBanner from "./verification-banner";
import VideosList from "./video-list";

interface CourseContentProps {
  course: {
    description: string;
  };
  videos: VideoSingle[];
  isVerified: boolean;
  canPlayVideo: (video: VideoSingle) => boolean;
  onVideoPress: (videoId: string) => void;
}

export default function CourseContent({
  course,
  videos,
  isVerified,
  canPlayVideo,
  onVideoPress,
}: CourseContentProps) {
  return (
    <View style={styles.contentBody}>
      <Text variant="titleLarge" style={styles.sectionTitle}>
        دەربارەی ئەم خولە
      </Text>
      <Text variant="bodyMedium" style={styles.descriptionText}>
        {course.description}
      </Text>

      {!isVerified && <VerificationBanner />}

      <View style={styles.curriculumHeader}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          لیستی ڤیدیۆکان
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
