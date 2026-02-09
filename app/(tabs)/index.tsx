import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Text,
  Button,
  Avatar,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Profile {
  id: string;
  full_name: string;
  role: string;
}

export default function HomeScreen() {
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isTeacher = profile?.role === "teacher";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Full Screen Teacher Hero */}
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
          {/* Header with User Info */}
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

          {/* Teacher Profile - Centered */}
          <View style={styles.teacherInfo}>
            <Avatar.Image
              size={140}
              source={{
                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
              }}
              style={styles.teacherAvatar}
            />
            <Text variant="headlineLarge" style={styles.teacherName}>
              Professor John Smith
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

      {/* Courses Section */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            {isTeacher ? "Your Courses" : "Available Courses"}
          </Text>
          <Text variant="bodyMedium" style={styles.sectionSubtitle}>
            Start learning from the best
          </Text>
        </View>

        {/* Placeholder for carousel */}
        <View style={styles.carouselPlaceholder}>
          <Text variant="bodyLarge" style={styles.placeholderText}>
            📚 Course carousel coming soon...
          </Text>
        </View>

        {isTeacher && (
          <View style={styles.section}>
            <Button
              mode="contained"
              icon="plus"
              style={styles.addButton}
              contentStyle={styles.addButtonContent}
            >
              Add New Course
            </Button>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroSection: {
    height: SCREEN_HEIGHT,
    width: "100%",
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userText: {
    gap: 2,
  },
  welcomeText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
  },
  userName: {
    color: "#fff",
    fontWeight: "600",
  },
  teacherInfo: {
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
  },
  teacherAvatar: {
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  teacherName: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  teacherBio: {
    color: "rgba(255,255,255,0.95)",
    textAlign: "center",
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginHorizontal: 20,
    borderRadius: 16,
    backdropFilter: "blur(10px)",
  },
  stat: {
    alignItems: "center",
    flex: 1,
    marginBottom: 20,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  statNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  statLabel: {
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
    fontSize: 14,
  },
  content: {
    backgroundColor: "#fff",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1a1a1a",
  },
  sectionSubtitle: {
    color: "#666",
    marginBottom: 16,
  },
  carouselPlaceholder: {
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
  },
  addButton: {
    marginTop: 8,
  },
  addButtonContent: {
    paddingVertical: 6,
  },
});
