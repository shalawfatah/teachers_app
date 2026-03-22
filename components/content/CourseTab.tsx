import React, { useState } from "react";
import {
  FlatList,
  View,
  RefreshControl,
  Alert,
  StyleSheet,
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { CoursesTabProps } from "@/types/courses";
import { useCourses } from "./course-tab/use-courses";
import { CourseCard } from "./course-tab/course-card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function CoursesTab({
  onEdit,
  onView,
  onDelete,
}: CoursesTabProps) {
  const [visibleMenuId, setVisibleMenuId] = useState<string | null>(null);
  const { courses, loading, refreshing, refresh } = useCourses();
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const handleDeletePress = (id: string) => {
    setVisibleMenuId(null);
    Alert.alert(text.delete_course, text.delete_course_warning, [
      { text: text.cancel, style: "cancel" },
      {
        text: text.delete,
        style: "destructive",
        onPress: () => onDelete?.(id),
      },
    ]);
  };

  if (loading && !refreshing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#325b4d" />
      </View>
    );
  }

  return (
    <FlatList
      data={courses}
      // 1. Grid Configuration
      numColumns={2}
      key={`courses-grid-${isRTL ? "rtl" : "ltr"}`} // Essential for toggling RTL or Column counts
      // 2. Styling the Grid
      style={{ flex: 1, direction: isRTL ? "rtl" : "ltr" }}
      contentContainerStyle={gridStyles.listContent}
      columnWrapperStyle={gridStyles.columnWrapper}
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
      showsVerticalScrollIndicator={false}
      // 3. Interactions & Empty State
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refresh}
          tintColor="#fff" // For iOS
          colors={["#325b4d"]} // For Android
        />
      }
      ListEmptyComponent={
        <View style={gridStyles.emptyContainer}>
          <Text style={gridStyles.emptyText}>{text.no_course_registered}</Text>
        </View>
      }
      // Add padding at the bottom so the last row isn't hidden by the TabBar
      ListFooterComponent={<View style={{ height: 100 }} />}
    />
  );
}

const gridStyles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 12, // Base padding for the whole list
    paddingTop: 10,
  },
  columnWrapper: {
    justifyContent: "space-between", // Pushes the two "books" to the edges
    marginBottom: 16, // Vertical gap between rows
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: "Goran",
    fontSize: 16,
  },
});
