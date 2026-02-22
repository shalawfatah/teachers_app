import React from "react";
import { View } from "react-native";
import { Text, FAB, Searchbar, SegmentedButtons } from "react-native-paper";
import { useRouter } from "expo-router";
import CoursesTab from "@/components/content/CourseTab";
import VideosTab from "@/components/content/VideoTab";
import { styles } from "@/styles/teacher_content_styles";
import { useContentManagement } from "./edit-course-components/useContentManagement";
import { ManagementModals } from "./edit-course-components/ManagementModals";

export default function ContentManagementScreen() {
  const router = useRouter();
  const m = useContentManagement();

  const onFabPress = () => {
    if (m.tab === "courses") m.setCourseModalVisible(true);
    else {
      m.setSelectedVideo(null);
      m.setVideoModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Manager
        </Text>
        <SegmentedButtons
          value={m.tab}
          onValueChange={m.setTab}
          buttons={[
            { value: "courses", label: "Courses", icon: "book" },
            { value: "videos", label: "Videos", icon: "play-circle" },
          ]}
        />
      </View>

      <Searchbar
        placeholder={`Search ${m.tab}...`}
        onChangeText={m.setSearchQuery}
        value={m.searchQuery}
        style={styles.searchbar}
      />

      {m.tab === "courses" ? (
        <CoursesTab
          key={`courses-${m.refreshKey}`}
          onView={(id) => router.push(`/content/view/${id}`)}
          onEdit={(id) => router.push(`/content/edit/${id}`)}
          onDelete={m.handleDeleteCourse}
        />
      ) : (
        <VideosTab
          key={`videos-${m.refreshKey}`}
          onEdit={(v) => {
            m.setSelectedVideo(v);
            m.setVideoModalVisible(true);
          }}
          onView={(v) => {
            m.setSelectedVideo(v);
            m.setPlayerVisible(true);
          }}
          onDelete={m.handleDeleteVideo}
        />
      )}

      <ManagementModals state={m} onRefresh={m.triggerRefresh} />

      <FAB
        icon={m.tab === "courses" ? "plus" : "video-plus"}
        label={m.tab === "courses" ? "New Course" : "Upload"}
        style={styles.fab}
        onPress={onFabPress}
        color="#FFF"
      />
    </View>
  );
}
