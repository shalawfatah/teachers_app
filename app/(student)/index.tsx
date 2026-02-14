import { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/home_styles";
import Loader from "@/components/Loader";
import { Student } from "@/types/profile";

// Define type for teacher stats
type TeacherStats = {
  students_count: number;
  courses_count: number;
  videos_count: number;
};

export default function StudentDashboard() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [teacherStats, setTeacherStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  // Separate effect to fetch stats when profile is loaded
  useEffect(() => {
    if (profile?.teachers?.id) {
      getTeacherStats(profile.teachers.id);
    }
  }, [profile]); // Runs when profile changes

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

      // The RPC returns an array with one object
      setTeacherStats(data?.[0] || null);
    } catch (error) {
      console.error("Error fetching teacher stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{
          uri:
            profile?.teachers?.cover_img ||
            "https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=1200",
        }}
        style={styles.heroSection}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Avatar.Text size={45} label={profile?.name?.charAt(0) || "U"} />
              <View style={styles.userText}>
                <Text variant="bodySmall" style={styles.welcomeText}>
                  Welcome,
                </Text>
                <Text variant="titleMedium" style={styles.userName}>
                  {profile?.name}
                </Text>
              </View>
            </View>
            <IconButton
              icon="logout"
              iconColor="#fff"
              size={24}
              onPress={handleSignOut}
            />
          </View>

          <View style={styles.teacherInfo}>
            {profile?.teachers?.thumbnail ? (
              <Avatar.Image
                size={140}
                source={{ uri: profile.teachers.thumbnail }}
                style={styles.teacherAvatar}
              />
            ) : (
              <Avatar.Text
                size={140}
                label={profile?.teachers?.name?.charAt(0) || "T"}
                style={styles.teacherAvatar}
              />
            )}
            <Text variant="headlineLarge" style={styles.teacherName}>
              {profile?.teachers?.name}
            </Text>
            <Text variant="titleMedium" style={styles.teacherBio}>
              {profile?.teachers?.expertise}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text variant="headlineMedium" style={styles.statNumber}>
                {statsLoading ? "..." : teacherStats?.videos_count || 0}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Videos
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text variant="headlineMedium" style={styles.statNumber}>
                {statsLoading ? "..." : teacherStats?.courses_count || 0}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Courses
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text variant="headlineMedium" style={styles.statNumber}>
                {statsLoading ? "..." : teacherStats?.students_count || 0}
              </Text>
              <Text variant="bodyMedium" style={styles.statLabel}>
                Students
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
}
