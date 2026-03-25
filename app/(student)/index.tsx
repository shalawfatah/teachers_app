import { useState, useEffect } from "react";
import { ScrollView, View, Pressable, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/home_styles";
import Loader from "@/components/Loader";
import { Student } from "@/types/profile";
import { ReklamCarousel } from "@/components/content/ReklamCarousel";
import LanguageSwitcherModal from "@/components/general/language-switcher-modal-pro";
import { useLanguage } from "@/contexts/LanguageContext"; // Added to handle guest translations

type TeacherStats = {
  students_count: number;
  courses_count: number;
  videos_count: number;
};

export default function StudentDashboard() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [guestTeacherId, setGuestTeacherId] = useState<string | null>(null);
  const [, setTeacherStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setStatsLoading] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const router = useRouter();
  const { lang } = useLanguage();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const targetTeacherId = profile?.teachers?.id || guestTeacherId;
    if (targetTeacherId) {
      getTeacherStats(targetTeacherId);
    }
  }, [profile, guestTeacherId]);

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
      } else {
        const { data: teacherData, error: teacherError } = await supabase
          .from("teachers")
          .select("id")
          .limit(1)
          .single();

        if (!teacherError && teacherData) {
          setGuestTeacherId(teacherData.id);
        }
      }
    } catch (error) {
      console.error("Error fetching profile or guest teacher:", error);
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

  const getLanguageFlag = (langCode: number) => {
    return langCode === 1 ? "🇬🇧" : "🇹🇯";
  };

  const handleLanguageChange = () => {
    getProfile();
  };

  if (loading) return <Loader />;

  const activeTeacherId = profile?.teachers?.id || guestTeacherId;
  const isGuest = !profile;

  return (
    <>
      {/* LEFT SIDE: LOGIN CHIP (Only for Guests) */}
      {isGuest && (
        <View style={localStyles.topLeftContainer}>
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <BlurView intensity={60} tint="light" style={localStyles.glassChip}>
              <IconButton
                icon="account-circle-outline"
                iconColor="#FFF"
                size={20}
                style={{ margin: 0 }}
              />
              <Text style={localStyles.loginText}>
                {lang === 1 ? "Login" : "چوونەژوورەوە"}
              </Text>
            </BlurView>
          </Pressable>
        </View>
      )}

      {/* RIGHT SIDE: LANGUAGE SWITCHER */}
      <View style={localStyles.topRightContainer}>
        <Pressable
          onPress={() => setLanguageModalVisible(true)}
          style={localStyles.languageButton}
        >
          <Text style={{ fontSize: 18, marginRight: 4 }}>
            {getLanguageFlag(profile?.lang || lang || 1)}
          </Text>
          <IconButton
            icon="chevron-down"
            iconColor="#FFF" // Changed to white for better visibility on glass
            size={16}
            style={{ margin: 0 }}
          />
        </Pressable>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {activeTeacherId && <ReklamCarousel teacherId={activeTeacherId} />}
      </ScrollView>

      <LanguageSwitcherModal
        visible={languageModalVisible}
        onDismiss={() => setLanguageModalVisible(false)}
        currentLang={profile?.lang || lang || 1}
        profileId={profile?.id || ""}
        onLanguageChange={handleLanguageChange}
      />
    </>
  );
}

const localStyles = StyleSheet.create({
  topLeftContainer: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
  },
  topRightContainer: {
    position: "absolute",
    top: 50,
    right: 16,
    zIndex: 10,
  },
  glassChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
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
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.4)",
    borderWidth: 1,
  },
});
