import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, FAB, Searchbar, SegmentedButtons } from "react-native-paper";
import CoursesTab from "@/components/content/CourseTab";
import VideosTab from "@/components/content/VideoTab";
import CreateCourseModal from "@/components/courses/CreateCourseModal";
import VideoViewModal from "@/components/content/VideoPlayerModal";
import { EditVideoModal } from "./EditVideoModal"; // renamed for clarity
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

export default function ContentManagementScreen() {
  const [tab, setTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");

  // Refresh key to force VideosTab to re-fetch after edit/upload
  const [refreshKey, setRefreshKey] = useState(0);

  // Modal Visibility States
  const [isCourseModalVisible, setCourseModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const router = useRouter();

  const handleDeleteVideo = async (id: string) => {
    Alert.alert("Delete Video", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const { error } = await supabase.from("videos").delete().eq("id", id);
          if (error) {
            Alert.alert("Error", error.message);
          } else {
            setRefreshKey((prev) => prev + 1); // Trigger list refresh
          }
        },
      },
    ]);
  };

  const handleFabPress = () => {
    if (tab === "courses") {
      setCourseModalVisible(true);
    } else {
      setSelectedVideo(null); // Ensure we aren't in "edit mode"
      setEditModalVisible(true);
    }
  };

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

      <View style={{ flex: 1 }}>
        {tab === "courses" ? (
          <CoursesTab
            onView={(id) => router.push(`/content/view/${id}`)}
            onEdit={(id) => router.push(`/content/edit/${id}`)}
            onDelete={async (id) => {
              const { error } = await supabase
                .from("courses")
                .delete()
                .eq("id", id);
              if (error) Alert.alert("Error", error.message);
            }}
          />
        ) : (
          <VideosTab
            key={refreshKey} // Changing this forces a re-fetch
            onView={(video) => {
              setSelectedVideo(video);
              setPlayerVisible(true);
            }}
            onEdit={(video) => {
              setSelectedVideo(video); // This video goes to the modal
              setEditModalVisible(true); // This opens the modal
            }}
            onDelete={(id) => handleDeleteVideo(id)}
          />
        )}
      </View>

      {/* 1. Video Player Modal */}
      <VideoViewModal
        visible={playerVisible}
        video={selectedVideo}
        onDismiss={() => setPlayerVisible(false)}
      />

      {/* 2. Course Creation Modal */}
      <CreateCourseModal
        visible={isCourseModalVisible}
        onDismiss={() => setCourseModalVisible(false)}
        onSuccess={() => setCourseModalVisible(false)}
      />

      {/* 3. Video Edit/Upload Modal */}
      <EditVideoModal
        visible={isEditModalVisible}
        video={selectedVideo}
        onDismiss={() => {
          setEditModalVisible(false);
          setSelectedVideo(null);
        }}
        onSuccess={() => {
          setRefreshKey((prev) => prev + 1); // Refresh the list
          setEditModalVisible(false);
        }}
      />

      <FAB
        icon={tab === "courses" ? "plus" : "video-plus"}
        label={tab === "courses" ? "New Course" : "Upload"}
        style={styles.fab}
        onPress={handleFabPress}
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
