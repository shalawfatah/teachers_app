import { useState, useEffect } from "react";
import { View, ImageBackground, ScrollView } from "react-native";
import { Text, Avatar, IconButton, FAB } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";
import { Profile } from "@/types/profile";
import { styles } from "@/styles/teacher_home_styles";
import Loader from "@/components/Loader";

export default function TeacherDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }
    setLoading(false);
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
                  label={profile?.full_name?.charAt(0) || "U"}
                />
                <View style={styles.userText}>
                  <Text variant="bodySmall" style={styles.welcomeText}>
                    Welcome back,
                  </Text>
                  <Text variant="titleMedium" style={styles.userName}>
                    {profile?.full_name}
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
              <Avatar.Image
                size={140}
                source={{
                  uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                }}
                style={styles.teacherAvatar}
              />
              <Text variant="headlineLarge" style={styles.teacherName}>
                {profile?.full_name}
              </Text>
              <Text variant="titleMedium" style={styles.teacherBio}>
                Computer Science & Web Development
              </Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  156
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Videos
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  12
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Courses
                </Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text variant="headlineMedium" style={styles.statNumber}>
                  1.2K
                </Text>
                <Text variant="bodyMedium" style={styles.statLabel}>
                  Students
                </Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        label="Add Course"
        onPress={() => console.log("Add course")}
      />
    </View>
  );
}
