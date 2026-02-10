import { View, ScrollView, FlatList, ImageBackground } from "react-native";
import {
  Text,
  Card,
  IconButton,
  Chip,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Course, Video } from "@/types/courses";
import {
  placeholder_video,
  placeholder_videos,
} from "@/utils/place_holder_videos";
import { styles } from "@/styles/singlecourse";

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    setTimeout(() => {
      setCourse(placeholder_video);

      setVideos(placeholder_videos);

      setLoading(false);
    }, 500);
  };

  const handleVideoPress = (videoId: string) => {
    console.log("Play video:", videoId);
  };

  const renderVideo = ({ item, index }: { item: Video; index: number }) => (
    <Card style={styles.videoCard} onPress={() => handleVideoPress(item.id)}>
      <View style={styles.videoContent}>
        <View style={styles.videoNumber}>
          <Text variant="titleMedium" style={styles.numberText}>
            {index + 1}
          </Text>
        </View>

        <Card.Cover
          source={{ uri: item.thumbnail }}
          style={styles.videoThumbnail}
        />

        <View style={styles.videoInfo}>
          <Text
            variant="titleMedium"
            style={styles.videoTitle}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            variant="bodySmall"
            style={styles.videoDescription}
            numberOfLines={1}
          >
            {item.description}
          </Text>
          <View style={styles.videoMeta}>
            <Chip icon="clock-outline" compact style={styles.durationChip}>
              {item.duration}
            </Chip>
          </View>
        </View>

        <IconButton icon="play-circle" size={28} iconColor="#6200ee" />
      </View>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Course Header */}
        <ImageBackground
          source={{ uri: course.thumbnail }}
          style={styles.headerImage}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
          >
            <View style={styles.headerTop}>
              <IconButton
                icon="arrow-left"
                iconColor="#fff"
                size={28}
                onPress={() => router.back()}
                style={styles.backButton}
              />
            </View>

            <View style={styles.headerContent}>
              <View style={styles.tags}>
                <Chip
                  icon="school"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  {course.grade}
                </Chip>
                <Chip
                  icon="book-open"
                  style={styles.chip}
                  textStyle={styles.chipText}
                >
                  {course.subject}
                </Chip>
              </View>

              <Text variant="headlineMedium" style={styles.courseTitle}>
                {course.title}
              </Text>

              <Text variant="bodyMedium" style={styles.courseDescription}>
                {course.description}
              </Text>

              <View style={styles.courseStats}>
                <View style={styles.stat}>
                  <Text variant="titleMedium" style={styles.statNumber}>
                    {course.video_count}
                  </Text>
                  <Text variant="bodySmall" style={styles.statLabel}>
                    Videos
                  </Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.stat}>
                  <Text variant="titleMedium" style={styles.statNumber}>
                    {videos.reduce((acc, v) => {
                      const [min, sec] = v.duration.split(":").map(Number);
                      return acc + min;
                    }, 0)}{" "}
                    min
                  </Text>
                  <Text variant="bodySmall" style={styles.statLabel}>
                    Total Duration
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* Videos List */}
        <View style={styles.videosSection}>
          <View style={styles.sectionHeader}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Course Content
            </Text>
            <Text variant="bodyMedium" style={styles.sectionSubtitle}>
              {videos.length} video{videos.length !== 1 ? "s" : ""}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <FlatList
            data={videos}
            renderItem={renderVideo}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.videosList}
          />
        </View>
      </ScrollView>
    </View>
  );
}
