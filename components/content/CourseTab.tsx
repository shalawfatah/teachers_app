import React, { useState, useEffect, useCallback } from "react";
import { FlatList, View, RefreshControl, Alert } from "react-native";
import {
  Card,
  IconButton,
  Menu,
  Divider,
  Text,
  Chip,
  ActivityIndicator,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { Course, CoursesTabProps } from "@/types/courses";
import { styles } from "@/styles/course_tab_styles";

export default function CoursesTab({
  onEdit,
  onView,
  onDelete,
}: CoursesTabProps) {
  const [visibleId, setVisibleId] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const openMenu = (id: string) => setVisibleId(id);
  const closeMenu = () => setVisibleId(null);

  const fetchMyCourses = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("courses")
        .select("*, videos(*)")
        .eq("teacher_id", user.id)
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

  const handleDeletePress = (id: string) => {
    closeMenu();
    Alert.alert(
      "Delete Course",
      "Are you sure? This will remove the course and all linked data.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete?.(id),
        },
      ],
    );
  };

  const renderCourse = ({ item }: { item: Course }) => {
    const hasThumbnail = item.thumbnail && item.thumbnail.trim().length > 0;

    return (
      <Card style={styles.card} mode="elevated">
        {hasThumbnail && (
          <Card.Cover source={{ uri: item.thumbnail }} style={styles.cover} />
        )}

        <Card.Title
          title={item.title}
          titleVariant="titleLarge"
          subtitle={`${item.videos.length || 0} Videos • ${item.subject}`}
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
                  closeMenu();
                  onView?.(item.id); // Trigger prop function
                }}
                title="View"
                leadingIcon="eye"
              />
              <Divider />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  onEdit?.(item.id); // Trigger prop function
                }}
                title="Edit"
                leadingIcon="pencil"
              />
              <Divider />
              <Menu.Item
                onPress={() => handleDeletePress(item.id)}
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
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <FlatList
      data={courses}
      renderItem={renderCourse}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge">هیچ خولێک دانەنراوە</Text>
        </View>
      }
    />
  );
}
