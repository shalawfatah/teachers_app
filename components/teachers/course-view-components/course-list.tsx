import React from "react";
import { Pressable, View } from "react-native";
import { List, Text, Card, IconButton } from "react-native-paper";
import { styles } from "@/styles/content_single_styles";
import { useRouter } from "expo-router";

interface Props {
  videos: any[];
}

export default function LessonList({ videos }: Props) {
  const router = useRouter();
  if (videos.length === 0) {
    return (
      <Card style={styles.emptyLessons}>
        <Card.Content>
          <IconButton
            icon="play-box-multiple"
            size={40}
            style={styles.centerIcon}
          />
          <Text style={styles.centerText}>هیچ وانەیەک داخڵنەکراوە</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={{ direction: "rtl" }}>
      <View style={styles.lessonsHeader}>
        <Text variant="titleLarge">ناوەرۆکی خول</Text>
      </View>
      {videos.map((item, index) => (
        <Pressable
          key={item.id}
          onPress={() => {
            router.push(`/video/${item.id}`);
          }}
        >
          <List.Item
            title={`${index + 1}. ${item.title}`}
            left={(p) => <List.Icon {...p} icon="play-circle-outline" />}
            style={styles.videoItem}
          />
        </Pressable>
      ))}
    </View>
  );
}
