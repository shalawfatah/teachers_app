import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  ImageBackground,
} from "react-native";
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

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_count: number;
  grade: string;
  subject: string;
}

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
    // TODO: Fetch from Supabase
    // For now, using placeholder data
    setTimeout(() => {
      setCourse({
        id: id as string,
        title: "Introduction to Web Development",
        description:
          "Learn the fundamentals of HTML, CSS, and JavaScript. This comprehensive course will take you from beginner to confident web developer.",
        thumbnail:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        video_count: 12,
        grade: "Grade 10",
        subject: "Computer Science",
      });

      setVideos([
        {
          id: "1",
          title: "Introduction to HTML",
          description: "Learn the basics of HTML structure and tags",
          duration: "15:30",
          thumbnail:
            "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400",
          order: 1,
        },
        {
          id: "2",
          title: "CSS Fundamentals",
          description: "Style your web pages with CSS",
          duration: "22:45",
          thumbnail:
            "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400",
          order: 2,
        },
        {
          id: "3",
          title: "JavaScript Basics",
          description: "Introduction to programming with JavaScript",
          duration: "28:15",
          thumbnail:
            "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
          order: 3,
        },
        {
          id: "4",
          title: "Building Your First Website",
          description: "Put it all together in a complete project",
          duration: "35:20",
          thumbnail:
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400",
          order: 4,
        },
      ]);

      setLoading(false);
    }, 500);
  };

  const handleVideoPress = (videoId: string) => {
    console.log("Play video:", videoId);
    // TODO: Navigate to video player screen
    // router.push(`/(student)/video/${videoId}`);
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
  },
  headerTop: {
    paddingTop: 50,
    paddingHorizontal: 8,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  headerContent: {
    padding: 20,
    paddingBottom: 30,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  chipText: {
    color: "#fff",
    fontSize: 12,
  },
  courseTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 12,
  },
  courseDescription: {
    color: "rgba(255,255,255,0.95)",
    lineHeight: 22,
    marginBottom: 20,
  },
  courseStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: 16,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    color: "#fff",
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  videosSection: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: "#666",
  },
  divider: {
    marginBottom: 16,
  },
  videosList: {
    gap: 12,
  },
  videoCard: {
    elevation: 1,
  },
  videoContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  videoNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontWeight: "bold",
    color: "#666",
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
  },
  videoInfo: {
    flex: 1,
    gap: 4,
  },
  videoTitle: {
    fontWeight: "600",
  },
  videoDescription: {
    color: "#666",
  },
  videoMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  durationChip: {
    height: 24,
  },
});
