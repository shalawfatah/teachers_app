import React from "react";
import { View, Image } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { styles } from "@/styles/content_single_styles";

interface Props {
  title: string;
  thumbnail?: string | null;
}

export const CourseHeader = ({ title, thumbnail }: Props) => {
  const hasThumbnail = thumbnail && thumbnail.trim().length > 0;

  return (
    <>
      {hasThumbnail && (
        <Image source={{ uri: thumbnail }} style={styles.headerImage} />
      )}
      <View style={styles.titleRow}>
        <Text variant="headlineMedium" style={styles.title}>
          {title}
        </Text>
        <IconButton icon="share-variant" onPress={() => { }} />
      </View>
    </>
  );
};
