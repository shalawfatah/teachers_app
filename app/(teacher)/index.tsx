import { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/teacher_home_styles";
import Loader from "@/components/Loader";
import { Teacher } from "@/types/profile";
import EditProfileModal from "@/components/teachers/account/EditProfileModal";

type TeacherStats = {
  students_count: number;
  courses_count: number;
  videos_count: number;
};

export default function TeacherDashboard() {
  const [profile, setProfile] = useState<Teacher | null>(null);
  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile?.id) {
      getStats();
    }
  }, [profile]);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("teachers")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    }
    setLoading(false);
  };

  const getStats = async () => {
    const { data, error } = await supabase.rpc("get_teacher_stats", {
      teacher_uuid: profile?.id,
    });
    if (error) {
      console.log(error);
    } else {
      setStats(data[0]);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=1200",
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
                <Avatar.Text
                  size={45}
                  label={profile?.name?.charAt(0) || "U"}
                />
                <View style={styles.userText}>
                  <Text variant="bodySmall" style={styles.welcomeText}>
                    Welcome back,
                  </Text>
                  <Text variant="titleMedium" style={styles.userName}>
                    {profile?.name}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <IconButton
                  icon="pencil"
                  iconColor="#fff"
                  size={24}
                  onPress={() => setEditModalVisible(true)}
                />
                <IconButton
                  icon="logout"
                  iconColor="#fff"
                  size={24}
                  onPress={handleSignOut}
                />
              </View>
            </View>
            <View style={styles.teacherInfo}>
              <Avatar.Image
                size={140}
                source={{
                  uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                }}
                style={styles.teacherAvatar}
              />
              <Text variant="headlineLarge" style={styles.teacherName}>
                {profile?.name}
              </Text>
              <Text variant="titleMedium" style={styles.teacherBio}>
                {profile?.expertise || "Computer Science & Web Development"}
              </Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  {stats?.videos_count || 0}
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Videos
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  {stats?.courses_count || 0}
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Courses
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  {stats?.students_count || 0}
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Students
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>

      <EditProfileModal
        visible={editModalVisible}
        onDismiss={() => setEditModalVisible(false)}
        profile={profile}
        onProfileUpdate={getProfile}
      />
    </View>
  );
}
