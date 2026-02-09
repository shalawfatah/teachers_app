import { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import {
  Text,
  Card,
  Button,
  Avatar,
  ActivityIndicator,
  IconButton,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { LinearGradient } from "expo-linear-gradient";

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
    <View style={styles.container}>
      {/* Hero Section with Teacher Image */}
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=800",
        }}
        style={styles.heroSection}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.7)"]}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <Avatar.Text
                size={50}
                label={profile?.full_name?.charAt(0) || "U"}
              />
              <View style={styles.userText}>
                <Text variant="bodySmall" style={styles.welcomeText}>
                  Welcome back,
                </Text>
                <Text variant="titleLarge" style={styles.userName}>
                  {profile?.full_name}
                </Text>
              </View>
            </View>
            <IconButton
              icon="logout"
              iconColor="#fff"
              onPress={handleSignOut}
            />
          </View>

          <View style={styles.teacherInfo}>
            <Avatar.Image
              size={120}
              source={{
                uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
              }}
              style={styles.teacherAvatar}
            />
            <Text variant="headlineMedium" style={styles.teacherName}>
              Professor John Smith
            </Text>
            <Text variant="bodyMedium" style={styles.teacherBio}>
              Computer Science & Web Development
            </Text>
            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text variant="headlineSmall" style={styles.statNumber}>
                  42
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Courses
                </Text>
              </View>
              <View style={styles.stat}>
                <Text variant="headlineSmall" style={styles.statNumber}>
                  1.2K
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Students
                </Text>
              </View>
              <View style={styles.stat}>
                <Text variant="headlineSmall" style={styles.statNumber}>
                  4.9
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  Rating
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Content Section - Carousel will go here */}
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            {isTeacher ? "Your Courses" : "Available Courses"}
          </Text>
          <Text variant="bodyMedium" style={styles.sectionSubtitle}>
            Carousel of courses coming soon...
          </Text>

          {/* Placeholder for courses */}
          <Card style={styles.placeholderCard}>
            <Card.Content>
              <Text variant="bodyLarge">📚 Course carousel</Text>
              <Text variant="bodySmall" style={styles.placeholderText}>
                This is where the course carousel will appear
              </Text>
            </Card.Content>
          </Card>
        </View>

        {isTeacher && (
          <View style={styles.section}>
            <Button mode="contained" icon="plus" style={styles.addButton}>
              Add New Course
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroSection: {
    height: 450,
  },
  gradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
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
    color: "rgba(255,255,255,0.8)",
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
  },
  teacherInfo: {
    alignItems: "center",
    gap: 8,
  },
  teacherAvatar: {
    marginBottom: 8,
    borderWidth: 3,
    borderColor: "#fff",
  },
  teacherName: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  teacherBio: {
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 32,
    marginTop: 16,
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    color: "#fff",
    fontWeight: "bold",
  },
  statLabel: {
    color: "rgba(255,255,255,0.8)",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: "#666",
    marginBottom: 16,
  },
  placeholderCard: {
    marginTop: 8,
  },
  placeholderText: {
    color: "#666",
    marginTop: 8,
  },
  addButton: {
    marginTop: 8,
  },
});
