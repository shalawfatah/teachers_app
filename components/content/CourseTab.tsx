import React, { useState } from "react";
import { FlatList, View, RefreshControl, Alert } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { CoursesTabProps } from "@/types/courses";
import { styles } from "@/styles/course_tab_styles";
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
  const { lang } = useLanguage();
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
  const { isRTL } = useLanguage();

  if (loading && !refreshing) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <FlatList
      data={courses}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
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
          <Text variant="bodyLarge">{text.no_course_registered}</Text>
        </View>
      }
    />
  );
}
