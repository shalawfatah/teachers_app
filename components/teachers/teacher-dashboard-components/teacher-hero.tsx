import { View, ImageBackground, Pressable } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "@/styles/teacher_home_styles";
import { TeacherHeroProps } from "@/types/teacher";
import StatsBar from "./stats-bar";
import { useState } from "react";
import LanguageSwitcherModal from "@/components/general/language-switcher-modal-pro";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { gradient_colors } from "@/utils/gradient_colors";

export default function TeacherHero({
  profile,
  stats,
  onEdit,
  onSignOut,
  onLanguageChange,
}: TeacherHeroProps) {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  const getLanguageFlag = (lang: number) => {
    return lang === 1 ? "🇬🇧" : "🇹🇯";
  };

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
      <LinearGradient colors={gradient_colors} style={styles.gradient}>
        <View style={[styles.header, { direction: isRTL ? "rtl" : "ltr" }]}>
          <View style={styles.userInfo}>
            <Avatar.Text size={45} label={profile?.name?.charAt(0) || "U"} />
            <View style={styles.userText}>
              <Text variant="bodySmall" style={styles.welcomeText}>
                {text.welcome}
              </Text>
              <Text variant="titleMedium" style={styles.userName}>
                {profile?.name}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              onPress={() => setLanguageModalVisible(true)}
              style={{
                marginRight: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, marginRight: 4 }}>
                {getLanguageFlag(profile?.lang || 1)}
              </Text>
              <IconButton
                icon="chevron-down"
                iconColor="#fff"
                size={16}
                style={{ margin: 0 }}
              />
            </Pressable>

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

        {profile && (
          <LanguageSwitcherModal
            visible={languageModalVisible}
            onDismiss={() => setLanguageModalVisible(false)}
            currentLang={profile?.lang || 1}
            profileId={profile?.id || ""} // Make sure this is the actual profile ID
            onLanguageChange={onLanguageChange || (() => { })}
          />
        )}
      </LinearGradient>
    </ImageBackground>
  );
}
