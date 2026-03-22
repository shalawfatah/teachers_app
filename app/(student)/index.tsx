import { useState, useEffect } from "react";
import { ScrollView, View, Pressable } from "react-native";
import { Text, IconButton } from "react-native-paper";
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
    return lang === 1 ? "🇬🇧" : "🇹🇯";
  };

  const handleLanguageChange = () => {
    getProfile();
  };

  if (loading) return <Loader />;

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 50,
          right: 16,
          zIndex: 10,
        }}
      >
        <Pressable
          onPress={() => setLanguageModalVisible(true)}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: "rgba(0,0,0,0.6)",
            borderRadius: 20,
            flexDirection: "row",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            borderColor: "rgba(255,255,255,0.6)",
            borderWidth: 1,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 4 }}>
            {getLanguageFlag(profile?.lang || 1)}
          </Text>
          <IconButton
            icon="chevron-down"
            iconColor="#333"
            size={16}
            style={{ margin: 0 }}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {profile?.teachers?.id && (
          <ReklamCarousel teacherId={profile.teachers.id} />
        )}
      </ScrollView>

      {profile && (
        <LanguageSwitcherModal
          visible={languageModalVisible}
          onDismiss={() => setLanguageModalVisible(false)}
          currentLang={profile?.lang || 1}
          profileId={profile?.id || ""}
          onLanguageChange={handleLanguageChange}
        />
      )}
    </>
  );
}
