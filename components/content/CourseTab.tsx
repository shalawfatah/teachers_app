import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  Card,
  IconButton,
  Menu,
  Divider,
  Text,
  Chip,
} from "react-native-paper";
import { placeholderCourses } from "@/utils/placeholder_courses";
import { Course } from "@/types/courses"; // Assuming your interface is here

export default function CoursesTab() {
  const [visibleId, setVisibleId] = useState<string | null>(null);

  const openMenu = (id: string) => setVisibleId(id);
  const closeMenu = () => setVisibleId(null);

  const renderCourse = ({ item }: { item: Course }) => (
    <Card style={styles.card} mode="elevated">
      {/* Course Thumbnail */}
      <Card.Cover
        source={{
          uri: item.thumbnail || "https://via.placeholder.com/300x150",
        }}
        style={styles.cover}
      />

      <Card.Title
        title={item.title}
        titleVariant="titleLarge"
        subtitle={`${item.video_count} Videos • ${item.subject}`}
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
        <Text variant="bodyMedium" numberOfLines={2} style={styles.description}>
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

  return (
    <FlatList
      data={placeholderCourses}
      renderItem={renderCourse}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
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
  cover: {
    height: 160,
  },
  description: {
    color: "#666",
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  chip: {
    backgroundColor: "#f0f0f0",
    height: 32,
  },
  chipText: {
    fontSize: 12,
  },
});
