import React from "react";
import { Pressable, View } from "react-native";
import { List, Text, Card, IconButton } from "react-native-paper";
import { styles } from "@/styles/content_single_styles";
import { useRouter } from "expo-router";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  videos: any[];
}

export default function LessonList({ videos }: Props) {
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
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
          <Text style={styles.centerText}>{text.no_course_registered}</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={{ direction: "rtl" }}>
      <View style={styles.lessonsHeader}>
        <Text variant="titleLarge">{text.course_content}</Text>
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
