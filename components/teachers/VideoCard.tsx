import React, { useState } from "react";
import { View } from "react-native";
import { Text, Card, Chip, IconButton, Menu } from "react-native-paper";
import { styles } from "@/styles/teacher_video_styles";
import { Video } from "@/types/courses";

interface VideoCardProps {
  video: Video;
  onEdit?: (videoId: string) => void;
  onDelete?: (videoId: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onEdit,
  onDelete,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleEdit = () => {
    closeMenu();
    onEdit?.(video.id);
  };

  const handleDelete = () => {
    closeMenu();
    onDelete?.(video.id);
  };

  return (
    <Card style={styles.videoCard}>
      <View style={styles.cardHeader}>
        <Card.Cover
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.durationBadge}>
          <Text variant="bodySmall" style={styles.durationText}>
            {video.duration}
          </Text>
        </View>
      </View>
      <Card.Content style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text
            variant="titleMedium"
            style={styles.videoTitle}
            numberOfLines={2}
          >
            {video.title}
          </Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton icon="dots-vertical" size={20} onPress={openMenu} />
            }
          >
            <Menu.Item onPress={handleEdit} title="Edit" leadingIcon="pencil" />
            <Menu.Item
              onPress={handleDelete}
              title="Delete"
              leadingIcon="delete"
            />
          </Menu>
        </View>
        <Text
          variant="bodyMedium"
          style={styles.videoDescription}
          numberOfLines={2}
        >
          {video.description}
        </Text>
        <View style={styles.videoFooter}>
          <Chip icon="eye" style={styles.chip} compact>
            {video.views} views
          </Chip>
          <Text variant="bodySmall" style={styles.uploadDate}>
            {new Date(video.uploaded_at).toLocaleDateString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};
