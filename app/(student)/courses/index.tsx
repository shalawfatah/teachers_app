import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  RefreshControl,
  StyleSheet,
  Pressable,
} from "react-native";
import { Text, IconButton } from "react-native-paper";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import { renderCourse } from "@/components/courses/Card";
import CourseHeader from "../../../components/courses/single-course-components/CourseHeader";
import useCourses from "../../../components/courses/single-course-components/use-courses";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";

export default function CoursesScreen() {
  const c = useCourses();
  const router = useRouter();
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsGuest(!user);
  };

  if (c.loading && !c.refreshing) return <Loader />;

  return (
    <LinearGradient colors={gradient_colors} style={{ flex: 1 }}>
      <BackgroundShapes />

      {/* GUEST LOGIN CHIP - Top Left */}
      {isGuest && (
        <View style={gridStyles.guestChipContainer}>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <BlurView intensity={60} tint="light" style={gridStyles.glassChip}>
              <IconButton
                icon="account-circle-outline"
                iconColor="#FFF"
                size={18}
                style={{ margin: 0 }}
              />
              <Text style={gridStyles.loginText}>
                {lang === 1 ? "Login" : "چوونەژوورەوە"}
              </Text>
            </BlurView>
          </Pressable>
        </View>
      )}

      <View
        style={[gridStyles.container, { direction: isRTL ? "rtl" : "ltr" }]}
      >
        <CourseHeader
          courseCount={c.courses.length}
          searchQuery={c.searchQuery}
          onSearchChange={c.setSearchQuery}
          filters={c.filters}
          onOpenFilter={() => c.setFilterVisible(true)}
        />

        <FlatList
          key={"two-column-grid"}
          data={c.courses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={gridStyles.row}
          contentContainerStyle={gridStyles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={c.refreshing}
              onRefresh={c.onRefresh}
              tintColor="#FFF"
            />
          }
          ListEmptyComponent={
            <View style={gridStyles.emptyContainer}>
              <Text style={gridStyles.emptyText}>
                {text.no_course_registered}
              </Text>
            </View>
          }
        />
      </View>
    </LinearGradient>
  );
}

const gridStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Increased to accommodate the guest chip
  },
  guestChipContainer: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 100,
  },
  glassChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  loginText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 4,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
  },
});
