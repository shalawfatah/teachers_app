import React from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { VideosTabProps } from "@/types/videos";
import { styles } from "@/styles/video_tab_styles";
import { useVideos } from "./video-tab-components/useVideos";
import VideoItem from "./video-tab-components/VideoItem";

export default function VideosTab({
  onEdit,
  onDelete,
  onView,
}: VideosTabProps) {
  const { videos, loading, refreshing, onRefresh } = useVideos();

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => (
        <VideoItem
          video={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      )}
    />
  );
}
