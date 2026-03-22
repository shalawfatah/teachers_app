import React from "react";

import { StyleSheet, View } from "react-native";
import { FAB, Searchbar, SegmentedButtons } from "react-native-paper";
import { useRouter } from "expo-router";
import CoursesTab from "@/components/content/CourseTab";
import VideosTab from "@/components/content/VideoTab";
import useContentManagement from "@/components/content/edit-course-components/useContentManagement";
import ManagementModals from "@/components/content/edit-course-components/ManagementModals";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";

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
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={gradient_colors}
        style={StyleSheet.absoluteFill}
      />
      <BackgroundShapes />

      {/* 1. GLASS SEGMENTED BUTTONS */}
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
        <SegmentedButtons
          value={m.tab}
          onValueChange={m.setTab}
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: 12,
          }}
          theme={{
            colors: {
              secondaryContainer: "#325b4d", // Active background
              onSecondaryContainer: "#FFF", // Active text/icon
              outline: "rgba(255,255,255,0.1)", // Border
            },
          }}
          buttons={[
            {
              value: "courses",
              label: text.course,
              icon: "book",
              labelStyle: {
                fontFamily: "NRT-Bold",
                color: m.tab === "courses" ? "#FFF" : "rgba(255,255,255,0.5)",
              },
            },
            {
              value: "videos",
              label: text.video,
              icon: "play-circle",
              labelStyle: {
                fontFamily: "NRT-Bold",
                color: m.tab === "videos" ? "#FFF" : "rgba(255,255,255,0.5)",
              },
            },
          ]}
        />
      </View>

      {/* 2. GLASS CAPSULE SEARCHBAR */}
      <Searchbar
        placeholder={text.search}
        iconColor="rgba(255,255,255,0.6)"
        placeholderTextColor="rgba(255,255,255,0.4)"
        inputStyle={{ color: "#FFF", fontFamily: "Goran" }}
        onChangeText={m.setSearchQuery}
        value={m.searchQuery}
        elevation={0} // Remove shadow
        style={{
          margin: 20,
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.1)",
          height: 50,
          direction: isRTL ? "rtl" : "ltr",
        }}
      />

      {/* Content Area */}
      <View style={{ flex: 1 }}>
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
      </View>

      <ManagementModals state={m} onRefresh={m.triggerRefresh} />

      {/* 3. THE REFINED FAB */}
      <FAB
        icon={m.tab === "courses" ? "plus" : "video-plus"}
        label={m.tab === "courses" ? text.new_course : text.upload}
        onPress={onFabPress}
        color="#000"
        style={{
          position: "absolute",
          margin: 16,
          right: isRTL ? undefined : 0,
          left: isRTL ? 0 : undefined,
          bottom: 0,
          backgroundColor: "#FFF", // High contrast white
          borderRadius: 16,
          elevation: 4, // Keep small elevation for FAB so it stays above content
        }}
        labelStyle={{
          fontFamily: "NRT-Bold",
          fontSize: 16,
          color: "#000",
        }}
      />
    </SafeAreaView>
  );
}
