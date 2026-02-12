import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, StyleSheet, RefreshControl } from "react-native";
import {
  List,
  IconButton,
  Avatar,
  Menu,
  Divider,
  ActivityIndicator,
} from "react-native-paper";
import { supabase } from "@/lib/supabase"; // Ensure this path is correct

interface VideosTabProps {
  onEdit: (video: any) => void; // Changed to object to make editing easier later
  onDelete: (id: string) => void;
  onView: (video: any) => void;
}

export default function VideosTab({
  onEdit,
  onDelete,
  onView,
}: VideosTabProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisibleId, setMenuVisibleId] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchVideos();
  };

  const openMenu = (id: string) => setMenuVisibleId(id);
  const closeMenu = () => setMenuVisibleId(null);

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
        <List.Item
          title={item.title}
          description={`${item.duration || "0:00"} • ${item.views ?? 0} views`}
          style={styles.listItem}
          left={() => (
            <Avatar.Image
              size={48}
              source={{
                uri: item.thumbnail || "https://via.placeholder.com/150",
              }}
            />
          )}
          right={() => (
            <View style={styles.row}>
              <Menu
                visible={menuVisibleId === item.id}
                onDismiss={closeMenu}
                anchor={
                  <IconButton
                    icon="dots-vertical"
                    size={24}
                    onPress={() => openMenu(item.id)}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    onView(item);
                    closeMenu();
                  }}
                  title="Watch Video"
                  leadingIcon="eye"
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    onEdit(item);
                    closeMenu();
                  }}
                  title="Edit Video"
                  leadingIcon="pencil-outline"
                />
                <Divider />
                <Menu.Item
                  onPress={() => {
                    onDelete(item.id);
                    closeMenu();
                  }}
                  title="Delete Video"
                  leadingIcon="trash-can-outline"
                  titleStyle={{ color: "#ff5252" }}
                />
              </Menu>
            </View>
          )}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 100 },
  listItem: {
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 12,
    elevation: 1,
  },
  row: { justifyContent: "center", alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
