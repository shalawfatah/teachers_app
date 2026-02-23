import { View, ImageBackground } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/teacher_home_styles";
import { Teacher } from "@/types/profile";
import { TeacherStats } from "@/types/teacher";
import StatsBar from "./stats-bar";

interface TeacherHeroProps {
  profile: Teacher | null;
  stats: TeacherStats | null;
  onEdit: () => void;
  onSignOut: () => void;
}

export default function TeacherHero({
  profile,
  stats,
  onEdit,
  onSignOut,
}: TeacherHeroProps) {
  return (
    <ImageBackground
      source={{
        uri:
          profile?.cover_img ||
          "https://images.unsplash.com/photo-1511629091441-ee46146481b6?w=1200",
      }}
      style={styles.heroSection}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.7)"]}
        style={styles.gradient}
      >
        {/* Header with user info and actions */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Avatar.Text size={45} label={profile?.name?.charAt(0) || "U"} />
            <View style={styles.userText}>
              <Text variant="bodySmall" style={styles.welcomeText}>
                بەخێربێیت
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
              onPress={onEdit}
            />
            <IconButton
              icon="logout"
              iconColor="#fff"
              size={24}
              onPress={onSignOut}
            />
          </View>
        </View>

        <View style={styles.teacherInfo}>
          {profile?.thumbnail ? (
            <Avatar.Image
              size={140}
              source={{ uri: profile.thumbnail }}
              style={styles.teacherAvatar}
            />
          ) : (
            <Avatar.Text
              size={140}
              label={profile?.name?.charAt(0) || "U"}
              style={styles.teacherAvatar}
            />
          )}
          <Text variant="headlineLarge" style={styles.teacherName}>
            {profile?.name}
          </Text>
          <Text variant="titleMedium" style={styles.teacherBio}>
            {profile?.expertise || "Computer Science & Web Development"}
          </Text>
        </View>
        <StatsBar stats={stats} />
      </LinearGradient>
    </ImageBackground>
  );
}
