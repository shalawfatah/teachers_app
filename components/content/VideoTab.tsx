import React from "react";
import { FlatList, View, RefreshControl } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { VideosTabProps } from "@/types/videos";
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="rgba(255,255,255,0.7)" />
      </View>
    );
  }

  return (
    <FlatList
      data={videos}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingVertical: 12, paddingBottom: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="rgba(255,255,255,0.5)"
        />
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
