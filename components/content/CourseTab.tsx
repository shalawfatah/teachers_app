import React, { useState, useEffect, useCallback } from "react";
import { FlatList, StyleSheet, View, RefreshControl } from "react-native";
import {
  Card,
  IconButton,
  Menu,
  Divider,
  Text,
  Chip,
  ActivityIndicator,
} from "react-native-paper";
import { supabase } from "@/lib/supabase"; // Import your supabase client
import { Course } from "@/types/courses";

export default function CoursesTab() {
  const [visibleId, setVisibleId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const openMenu = (id: string) => setVisibleId(id);
  const closeMenu = () => setVisibleId(null);

  // 1. Fetch logic: Get courses belonging to THIS teacher
  const fetchMyCourses = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("teacher_id", user.id) // Only get YOUR courses
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error("Error fetching teacher courses:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMyCourses();
  }, [fetchMyCourses]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMyCourses();
  };

  const renderCourse = ({ item }: { item: Course }) => {
    // 2. Conditional Thumbnail Logic
    const hasThumbnail = item.thumbnail && item.thumbnail.trim().length > 0;

    return (
      <Card style={styles.card} mode="elevated">
        {hasThumbnail && (
          <Card.Cover source={{ uri: item.thumbnail }} style={styles.cover} />
        )}

        <Card.Title
          title={item.title}
          titleVariant="titleLarge"
          subtitle={`${item.video_count || 0} Videos • ${item.subject}`}
          right={(props) => (
            <Menu
              visible={visibleId === item.id}
              onDismiss={closeMenu}
              anchor={
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={() => openMenu(item.id)}
                />
              }
            >
              <Menu.Item
                onPress={() => {
                  console.log("View", item.id);
                  closeMenu();
                }}
                title="View"
                leadingIcon="eye"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  console.log("Edit", item.id);
                  closeMenu();
                }}
                title="Edit"
                leadingIcon="pencil"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  console.log("Delete", item.id);
                  closeMenu();
                }}
                title="Delete"
                leadingIcon="delete"
                titleStyle={{ color: "red" }}
              />
            </Menu>
          )}
        />

        <Card.Content>
          <Text
            variant="bodyMedium"
            numberOfLines={2}
            style={styles.description}
          >
            {item.description}
          </Text>

          <View style={styles.badgeContainer}>
            <Chip icon="school" style={styles.chip} textStyle={styles.chipText}>
              Grade: {item.grade}
            </Chip>
            <Chip
              icon="book-outline"
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {item.subject}
            </Chip>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (loading && !refreshing) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      data={courses} // Changed from placeholderCourses
      renderItem={renderCourse}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge">You haven't created any courses yet.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: { padding: 16, paddingBottom: 100 },
  card: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  cover: { height: 160 },
  description: { color: "#666", marginBottom: 12 },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  chip: { backgroundColor: "#f0f0f0", height: 32 },
  chipText: { fontSize: 12 },
  emptyContainer: { padding: 40, alignItems: "center" },
});
