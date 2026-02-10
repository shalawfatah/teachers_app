import { courses_styles } from "@/styles/courses";
import { Course } from "@/types/courses";
import { Card, Chip, Text } from "react-native-paper";
import { View } from "react-native";

export const renderCourse = ({ item }: { item: Course }) => (
  <Card
    style={courses_styles.courseCard}
    onPress={() => console.log("Course pressed", item.id)}
  >
    <Card.Cover
      source={{ uri: item.thumbnail }}
      style={courses_styles.thumbnail}
    />
    <Card.Content style={courses_styles.cardContent}>
      <Text
        variant="titleMedium"
        style={courses_styles.courseTitle}
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <Text
        variant="bodyMedium"
        style={courses_styles.courseDescription}
        numberOfLines={2}
      >
        {item.description}
      </Text>
      <View style={courses_styles.courseFooter}>
        <Chip icon="play-circle" style={courses_styles.chip}>
          {item.video_count} videos
        </Chip>
      </View>
    </Card.Content>
  </Card>
);
