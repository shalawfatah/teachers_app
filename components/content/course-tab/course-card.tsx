import React from "react";
import { View, Pressable } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { Course } from "@/types/courses";
import { styles } from "@/styles/course_tab_styles";
import { CourseMenu } from "./course-menu";

interface CourseCardProps {
  course: Course;
  menuVisible: boolean;
  onOpenMenu: () => void;
  onCloseMenu: () => void;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CourseCard({
  course,
  menuVisible,
  onOpenMenu,
  onCloseMenu,
  onView,
  onEdit,
  onDelete,
}: CourseCardProps) {
  const hasThumbnail = course.thumbnail && course.thumbnail.trim().length > 0;

  return (
    <Card style={styles.card} mode="elevated">
      <Pressable
        onPress={onView}
        android_ripple={{ color: "rgba(0,0,0,0.1)" }}
        style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
      >
        {hasThumbnail && (
          <Card.Cover source={{ uri: course.thumbnail }} style={styles.cover} />
        )}

        <Card.Title
          title={course.title}
          titleStyle={{ fontFamily: "NRT-Bold" }}
          titleVariant="titleLarge"
          right={(props) => (
            <CourseMenu
              {...props}
              visible={menuVisible}
              onOpen={onOpenMenu}
              onClose={onCloseMenu}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          )}
        />

        <Card.Content>
          <Text
            variant="bodyMedium"
            numberOfLines={2}
            style={styles.description}
          >
            {course.description}
          </Text>
        </Card.Content>
      </Pressable>
    </Card>
  );
}
