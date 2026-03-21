import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Pressable,
  Platform,
  SafeAreaView,
} from "react-native";
import { Text, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/home_styles";
import Loader from "@/components/Loader";
import { Student } from "@/types/profile";
import { ReklamCarousel } from "@/components/content/ReklamCarousel";
import LanguageSwitcherModal from "@/components/general/language-switcher-modal-pro";

type TeacherStats = {
  students_count: number;
  courses_count: number;
  videos_count: number;
};

export default function StudentDashboard() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [, setTeacherStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setStatsLoading] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile?.teachers?.id) {
      getTeacherStats(profile.teachers.id);
    }
  }, [profile]);

  const getProfile = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("students")
          .select("*, teachers(*)")
          .eq("id", user.id)
          .single();
        if (error) throw error;
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTeacherStats = async (teacherId: string) => {
    try {
      setStatsLoading(true);
      const { data, error } = await supabase.rpc("get_teacher_stats", {
        teacher_uuid: teacherId,
      });
      if (error) throw error;
      setTeacherStats(data?.[0] || null);
    } catch (error) {
      console.error("Error fetching teacher stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const getLanguageFlag = (lang: number) => {
    return lang === 1 ? "🇬🇧" : "☀️";
  };

  if (loading) return <Loader />;

  return (
    <LinearGradient colors={["#FF8C00", "#FF0080"]} style={{ flex: 1 }}>
      {/* 1. Language Switcher: Positioned absolutely but higher up */}
      <View
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? 50 : 20,
          right: 16,
          zIndex: 100, // Ensure it's above the scrollview content
        }}
      >
        <Pressable
          onPress={() => setLanguageModalVisible(true)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 2 }}>
            {getLanguageFlag(profile?.lang || 1)}
          </Text>
          <IconButton
            icon="chevron-down"
            iconColor="#FFF"
            size={14}
            style={{ margin: 0 }}
          />
        </Pressable>
      </View>

      {/* 2. ScrollView: No backgroundColor, filling the screen */}
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 0, // REMOVED: Items will now fill from the very top
          paddingBottom: 90, // KEPT: Only enough to clear the bottom tab bar
        }}
      >
        {/* If your carousel is the first item, it will now hit the top of the screen */}
        {profile?.teachers?.id && (
          <ReklamCarousel teacherId={profile.teachers.id} />
        )}

        {/* Optional: Add a small spacer if the carousel is too high under the status bar */}
        <View style={{ height: 20 }} />

        {/* Welcome section moved inside or removed to maximize space */}
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <Text
            variant="titleLarge"
            style={{ color: "#FFF", fontFamily: "NRT-Bold" }}
          >
            {profile?.full_name}
          </Text>
        </View>
      </ScrollView>

      {profile && (
        <LanguageSwitcherModal
          visible={languageModalVisible}
          onDismiss={() => setLanguageModalVisible(false)}
          currentLang={profile?.lang || 1}
          profileId={profile?.id || ""}
          onLanguageChange={getProfile}
        />
      )}
    </LinearGradient>
  );
}
