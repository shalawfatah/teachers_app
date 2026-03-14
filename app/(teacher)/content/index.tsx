import React from "react";
import { View } from "react-native";
import { FAB, Searchbar, SegmentedButtons } from "react-native-paper";
import { useRouter } from "expo-router";
import CoursesTab from "@/components/content/CourseTab";
import VideosTab from "@/components/content/VideoTab";
import { styles } from "@/styles/teacher_content_styles";
import useContentManagement from "@/components/content/edit-course-components/useContentManagement";
import ManagementModals from "@/components/content/edit-course-components/ManagementModals";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function ContentManagementScreen() {
  const router = useRouter();
  const m = useContentManagement();
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const onFabPress = () => {
    if (m.tab === "courses") m.setCourseModalVisible(true);
    else {
      m.setSelectedVideo(null);
      m.setVideoModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SegmentedButtons
          value={m.tab}
          onValueChange={m.setTab}
          buttons={[
            { value: "courses", label: text.course, icon: "book" },
            { value: "videos", label: text.video, icon: "play-circle" },
          ]}
        />
      </View>

      <Searchbar
        placeholder={text.search}
        onChangeText={m.setSearchQuery}
        value={m.searchQuery}
        style={[styles.searchbar, { direction: isRTL ? "rtl" : "ltr" }]}
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
        label={m.tab === "courses" ? text.new_course : text.upload}
        style={styles.fab}
        onPress={onFabPress}
        color="#FFF"
      />
    </SafeAreaView>
  );
}
