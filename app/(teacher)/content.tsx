import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, FAB, Searchbar, SegmentedButtons } from "react-native-paper";
import { placeholderVideos } from "@/utils/placeholder_videos";
import CoursesTab from "@/components/content/CourseTab";
import VideosTab from "@/components/content/VideoTab";

export default function ContentManagementScreen() {
  const [tab, setTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Manager
        </Text>
        <SegmentedButtons
          value={tab}
          onValueChange={setTab}
          buttons={[
            { value: "courses", label: "Courses", icon: "book" },
            { value: "videos", label: "Videos", icon: "play-circle" },
          ]}
        />
      </View>

      <View style={styles.searchBox}>
        <Searchbar
          placeholder={`Search ${tab}...`}
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
      </View>

      {tab === "courses" ? (
        <CoursesTab />
      ) : (
        <VideosTab
          data={placeholderVideos}
          onEdit={(id) => console.log("Edit Video", id)}
          onDelete={(id) => console.log("Delete Video", id)}
        />
      )}

      <FAB
        icon={tab === "courses" ? "plus" : "video-plus"}
        label={tab === "courses" ? "New Course" : "Upload"}
        style={styles.fab}
        onPress={() => console.log(`Creating ${tab}`)}
        color="#FFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { padding: 20, backgroundColor: "white", gap: 10 },
  title: { fontWeight: "bold", color: "#1a1a1a" },
  searchBox: { padding: 16, paddingBottom: 8 },
  searchbar: { backgroundColor: "#fff", elevation: 2, borderRadius: 10 },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: "#6200ee",
  },
});
