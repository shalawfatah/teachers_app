import React from "react";
import { View } from "react-native";
import { List, Text, Card, IconButton } from "react-native-paper";
import { styles } from "@/styles/content_single_styles";

interface Props {
  videos: any[];
}

export default function LessonList({ videos }: Props) {
  if (videos.length === 0) {
    return (
      <Card style={styles.emptyLessons}>
        <Card.Content>
          <IconButton
            icon="play-box-multiple"
            size={40}
            style={styles.centerIcon}
          />
          <Text style={styles.centerText}>No lessons uploaded yet.</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View>
      <View style={styles.lessonsHeader}>
        <Text variant="titleLarge">Course Content</Text>
      </View>
      {videos.map((item, index) => (
        <List.Item
          key={item.id}
          title={`${index + 1}. ${item.title}`}
          description={item.duration || "Duration unknown"}
          left={(p) => <List.Icon {...p} icon="play-circle-outline" />}
          right={(p) => (
            <IconButton {...p} icon="chevron-right" onPress={() => { }} />
          )}
          style={styles.videoItem}
        />
      ))}
    </View>
  );
};
