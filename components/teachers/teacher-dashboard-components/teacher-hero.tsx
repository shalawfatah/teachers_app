import { style_vars } from "@/utils/style_vars";
import React, { useState } from "react"; // Added useState
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import { useLanguage } from "@/contexts/LanguageContext"; // To get currentLang
import LanguageSwitcherModal from "@/components/general/language-switcher-modal-pro";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function TeacherHero({ profile, onEdit, onSignOut }: any) {
  const [langModalVisible, setLangModalVisible] = useState(false);
  const { lang, refreshLanguage } = useLanguage(); // Assuming your context provides these

  return (
    <View style={heroStyles.mainContainer}>
      <ImageBackground
        source={{
          uri: profile?.thumbnail || "https://via.placeholder.com/800",
        }}
        style={heroStyles.absoluteImage}
        resizeMode="cover"
      >
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill}>
          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "transparent", "rgba(0,0,0,0.9)"]}
            style={StyleSheet.absoluteFill}
          >
            <BackgroundShapes />

            {/* HEADER AREA */}
            <View style={heroStyles.topNav}>
              <View style={heroStyles.glassPill}>
                {/* --- NEW LANGUAGE ICON --- */}
                <IconButton
                  icon="translate"
                  iconColor="#99f2c8" // Subtle green to match your "check" color
                  size={20}
                  onPress={() => setLangModalVisible(true)}
                />

                <IconButton
                  icon="pencil"
                  iconColor="#fff"
                  size={20}
                  onPress={onEdit}
                />
                <IconButton
                  icon="logout"
                  iconColor="#FF6B6B"
                  size={20}
                  onPress={onSignOut}
                />
              </View>
            </View>

            {/* CENTER CONTENT */}
            <View style={heroStyles.contentCenter}>
              <View style={heroStyles.avatarCircle}>
                <ImageBackground
                  source={{ uri: profile?.thumbnail }}
                  style={{ width: 140, height: 140 }}
                  imageStyle={{ borderRadius: 70 }}
                />
              </View>
              <Text style={heroStyles.nameText}>
                {profile?.name || "Teacher"}
              </Text>
              <Text style={heroStyles.expertiseText}>{profile?.expertise}</Text>
            </View>
          </LinearGradient>
        </BlurView>
      </ImageBackground>

      {/* --- LANGUAGE MODAL --- */}
      <LanguageSwitcherModal
        visible={langModalVisible}
        onDismiss={() => setLangModalVisible(false)}
        currentLang={lang}
        profileId={profile?.id}
        onLanguageChange={refreshLanguage} // Trigger the context update
      />
    </View>
  );
}

const heroStyles = StyleSheet.create({
  mainContainer: {
    // Force the container to take the full screen height
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "#000", // If the image fails, this keeps the screen from being white
  },
  absoluteImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
  },
  topNav: {
    paddingTop: 60,
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  glassPill: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  contentCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarCircle: {
    padding: 10,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    marginBottom: 20,
  },
  nameText: {
    color: "#FFF",
    fontSize: 38,
    fontFamily: style_vars.PRIMARY_FONT,
  },
  expertiseText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    marginTop: 10,
  },
});
