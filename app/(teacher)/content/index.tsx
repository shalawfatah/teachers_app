import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, FAB, Searchbar, SegmentedButtons } from "react-native-paper";
import CoursesTab from "@/components/content/CourseTab";
import VideosTab from "@/components/content/VideoTab";
import CreateCourseModal from "@/components/courses/CreateCourseModal";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import UploadVideoModal from "@/components/content/UploadVideoModal";
import { deleteVideo } from "@/lib/videoService";
import VideoPlayerModal from "@/components/content/VideoPlayerModal";

export default function ContentManagementScreen() {
  const [tab, setTab] = useState("courses");
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const [videoRefreshKey, setVideoRefreshKey] = useState(0);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const handleDeleteVideo = (id: string) => {
    Alert.alert(
      "Delete Video",
      "Are you sure you want to permanently delete this video?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteVideo(id);
              // Trigger the refresh key we discussed earlier
              setVideoRefreshKey((prev) => prev + 1);
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
    );
  };

  const onFabPress = () => {
    if (tab === "courses") {
      setCourseModalVisible(true);
    } else {
      setVideoModalVisible(true);
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

      {tab === "courses" ? (
        <CoursesTab
          onView={(id) => router.push(`/content/view/${id}`)}
          onEdit={(id) => router.push(`/content/edit/${id}`)}
          onDelete={async (id) => {
            const { error } = await supabase
              .from("courses")
              .delete()
              .eq("id", id);
            if (!error) {
              // You might want to trigger a refresh here via a state update
              // or by passing a ref to CoursesTab
            }
          }}
        />
      ) : (
        <VideosTab
          onEdit={(id) => console.log("Edit Video", id)}
          onView={(video) => {
            setSelectedVideo(video);
            setPlayerVisible(true);
          }}
          onDelete={(id) => handleDeleteVideo(id)}
        />
      )}

      <FAB
        icon={tab === "courses" ? "plus" : "video-plus"}
        label={tab === "courses" ? "New Course" : "Upload"}
        style={styles.fab}
        onPress={onFabPress} // Uses the helper function above
        color="#FFF"
      />
      <UploadVideoModal
        visible={videoModalVisible}
        onDismiss={() => setVideoModalVisible(false)}
        onSuccess={() => setVideoModalVisible(false)}
      />
      <CreateCourseModal
        visible={courseModalVisible}
        onDismiss={() => setCourseModalVisible(false)}
        onSuccess={() => {
          setCourseModalVisible(false);
          console.log("Course added successfully!");
        }}
      />
      <VideoPlayerModal
        visible={playerVisible}
        video={selectedVideo}
        onDismiss={() => {
          setPlayerVisible(false);
          setSelectedVideo(null);
        }}
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
