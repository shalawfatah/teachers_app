import { style_vars } from "@/utils/style_vars";
import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Text, Avatar, Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import EditProfileModal from "@/components/students/account/EditProfileModal";
import SettingsModal from "@/components/students/account/SettingsModal";
import { SettingsType } from "@/types/modal";
import StudentSettingsList from "@/components/students/student-account-components/StudentSettingsList";
import useStudentAccount from "@/components/students/student-account-components/useStudentAccount";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { GeometricPattern } from "@/components/backgrounds/GeometicPattern";

export default function AccountScreen() {
  const { profile, loading, handleSignOut, refreshProfile } =
    useStudentAccount();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSettingsType, setActiveSettingsType] =
    useState<SettingsType>(null);
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View style={{ flex: 1 }}>
      {/* 1. FIXED BACKGROUND LAYER */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={gradient_colors} style={{ flex: 1 }} />
        <GeometricPattern />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={accountStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. GLASS PROFILE CARD */}
        <BlurView
          intensity={25}
          tint="light"
          style={accountStyles.profileGlassCard}
        >
          <View style={accountStyles.avatarContainer}>
            <Avatar.Text
              size={90}
              label={profile?.name?.charAt(0) || "U"}
              style={accountStyles.avatarShadow}
              labelStyle={{
                fontFamily: style_vars.PRIMARY_FONT,
                fontWeight: "bold",
              }}
            />
          </View>

          <Text variant="headlineSmall" style={accountStyles.userName}>
            {profile?.name}
          </Text>
          <Text variant="bodyMedium" style={accountStyles.userRole}>
            {text.student.toUpperCase()}
          </Text>
        </BlurView>

        {/* 3. SETTINGS SECTION WRAPPED IN GLASS */}
        <View
          style={[
            accountStyles.settingsWrapper,
            { direction: isRTL ? "rtl" : "ltr" },
          ]}
        >
          <BlurView
            intensity={15}
            tint="light"
            style={accountStyles.listGlassCard}
          >
            <StudentSettingsList
              onEditPress={() => setIsModalVisible(true)}
              onSettingsPress={setActiveSettingsType}
            />
          </BlurView>
        </View>

        {/* 4. LOGOUT ACTION */}
        <View style={accountStyles.signOutContainer}>
          <Button
            mode="contained"
            onPress={handleSignOut}
            loading={loading}
            disabled={loading}
            style={accountStyles.signOutButton}
            textColor="#000"
            labelStyle={accountStyles.signOutLabel}
          >
            {text.logout}
          </Button>
        </View>

        {/* Bottom Spacing for TabBar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <EditProfileModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        profile={profile}
        onProfileUpdate={refreshProfile}
      />
      <SettingsModal
        type={activeSettingsType}
        visible={activeSettingsType !== null}
        onDismiss={() => setActiveSettingsType(null)}
      />
    </View>
  );
}

const accountStyles = StyleSheet.create({
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  profileGlassCard: {
    padding: 25,
    borderRadius: 30,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 20,
    overflow: "hidden",
  },
  avatarContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  avatarShadow: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  userName: {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    marginTop: 15,
    fontWeight: "bold",
  },
  userRole: {
    color: "rgba(255, 255, 255, 0.6)",
    letterSpacing: 2,
    fontSize: 12,
    marginTop: 4,
    fontFamily: style_vars.PRIMARY_FONT,
  },
  settingsWrapper: {
    marginTop: 10,
  },
  listGlassCard: {
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    overflow: "hidden",
    paddingVertical: 10,
  },
  signOutContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  signOutLabel: {
    fontFamily: style_vars.PRIMARY_FONT,
    fontSize: 16,
    fontWeight: "bold",
  },
});
