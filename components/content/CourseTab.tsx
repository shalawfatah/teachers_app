import React, { useState } from "react";
import { FlatList, View, RefreshControl, Alert } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { CoursesTabProps } from "@/types/courses";
import { styles } from "@/styles/course_tab_styles";
import { useCourses } from "./course-tab/use-courses";
import { CourseCard } from "./course-tab/course-card";

export default function CoursesTab({
  onEdit,
  onView,
  onDelete,
}: CoursesTabProps) {
  const [visibleMenuId, setVisibleMenuId] = useState<string | null>(null);
  const { courses, loading, refreshing, refresh } = useCourses();

  const handleDeletePress = (id: string) => {
    setVisibleMenuId(null);
    Alert.alert(
      "سڕینەوەی خول",
      "دڵنیای دەتەوێت ئەم خولە بسڕیتەوە، تەواوی زانیارییەکان نامێنێت",
      [
        { text: "پاشگەزبوونەوە", style: "cancel" },
        {
          text: "سڕینەوە",
          style: "destructive",
          onPress: () => onDelete?.(id),
        },
      ],
    );
  };

  if (loading && !refreshing) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <FlatList
      data={courses}
      style={{ direction: "rtl" }}
      renderItem={({ item }) => (
        <CourseCard
          course={item}
          menuVisible={visibleMenuId === item.id}
          onOpenMenu={() => setVisibleMenuId(item.id)}
          onCloseMenu={() => setVisibleMenuId(null)}
          onView={() => {
            setVisibleMenuId(null);
            onView?.(item.id);
          }}
          onEdit={() => {
            setVisibleMenuId(null);
            onEdit?.(item.id);
          }}
          onDelete={() => handleDeletePress(item.id)}
        />
      )}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text variant="bodyLarge">هیچ خولێک دانەنراوە</Text>
        </View>
      }
    />
  );
}
