import { Card, Text, Chip } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SingleCourse } from "@/types/courses";

export const renderCourse = ({ item }: { item: SingleCourse }) => {
  const hasThumbnail = item.thumbnail && item.thumbnail.trim().length > 0;
  return (
    <Link href={`/(student)/courses/${item.id}`} asChild>
      <Card style={styles.courseCard}>
        {/* Only render the photo part if a thumbnail is provided */}
        {hasThumbnail && (
          <Card.Cover
            source={{ uri: item.thumbnail }}
            style={styles.thumbnail}
          />
        )}

        <Card.Content style={styles.cardContent}>
          <Text
            variant="titleMedium"
            style={styles.courseTitle}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            variant="bodyMedium"
            style={styles.courseDescription}
            numberOfLines={2}
          >
            {item.description}
          </Text>

          <View style={styles.courseFooter}>
            <Chip icon="play-circle" style={styles.chip}>
              {item.video_count ?? 0} videos
            </Chip>

            {/* Optional: Add Grade badge since you have it in the DB */}
            <Chip style={[styles.chip, { marginLeft: 8 }]}>
              Grade {item.grade}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    </Link>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    marginBottom: 16,
    elevation: 2,
    backgroundColor: "white", // Ensures card is visible against background
    overflow: "hidden", // Clips children to border radius
  },
  thumbnail: {
    height: 180,
    borderRadius: 0, // Optional: keeps top square if you prefer that look
  },
  cardContent: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  courseTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  courseDescription: {
    color: "#666",
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    alignSelf: "flex-start",
    height: 32,
  },
});
