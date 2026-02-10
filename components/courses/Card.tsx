import { Card, Text, Chip } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  video_count: number;
}

export const renderCourse = ({ item }: { item: Course }) => {
  return (
    <Link href={`/course/${item.id}`} asChild>
      <Card style={styles.courseCard}>
        <Card.Cover source={{ uri: item.thumbnail }} style={styles.thumbnail} />

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
              {item.video_count} videos
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
  },

  thumbnail: {
    height: 180,
  },

  cardContent: {
    paddingTop: 12,
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
  },
});
