import React, { useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Avatar, Button } from "react-native-paper";
import { styles } from "@/styles/teacher_account_styles";
import StatsCard from "@/components/account/StatsCard";
import EditProfileModal from "@/components/teachers/account/EditProfileModal";
import SettingsModal from "@/components/teachers/account/SettingsModal";
import DeleteAccountModal from "@/components/teachers/account/DeleteAccountModal";
import { SettingsType } from "@/types/modal";
import useTeacherAccount from "@/components/teachers/teacher-account-components/useTeacherAccount";
import AccountSettingsList from "@/components/teachers/teacher-account-components/AccountSettingsList";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import PrimaryButton from "@/components/general/primary-button";
import SecondaryButton from "@/components/general/secondary-button";

export default function AccountScreen() {
  const { profile, stats, loading, handleSignOut, refreshProfile } =
    useTeacherAccount();
  const [editVisible, setEditVisible] = useState(false);
  const [activeSettings, setActiveSettings] = useState<SettingsType>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
      <LinearGradient
        colors={gradient_colors}
        style={StyleSheet.absoluteFill}
      />
      <BackgroundShapes />

      <ScrollView
        style={{ flex: 1, backgroundColor: "transparent" }}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.container,
            {
              direction: isRTL ? "rtl" : "ltr",
              backgroundColor: "transparent",
            },
          ]}
        >
          <View style={[styles.profileHeader, { width: "100%" }]}>
            <Avatar.Text
              size={80}
              label={profile?.name?.charAt(0) || "U"}
              style={styles.avatar}
            />
            <Text
              variant="headlineSmall"
              style={{
                marginTop: 12,
                color: "#FFF",
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: "NRT-Bold",
              }}
            >
              {profile?.name}
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                color: "rgba(255,255,255,0.7)",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              {text.teacher}
            </Text>
          </View>

          {stats && (
            <StatsCard
              courseNumber={stats.courses_count}
              videoNumber={stats.videos_count}
              studentNumber={stats.students_count}
            />
          )}

          <AccountSettingsList
            onEditPress={() => setEditVisible(true)}
            onSettingsPress={(type) => setActiveSettings(type)}
          />
          <SecondaryButton text={text.logout} action={handleSignOut} />
          <PrimaryButton
            text={text.delete_acc}
            action={() => setDeleteVisible(true)}
          />
        </View>
      </ScrollView>

      {/* Modals */}
      <EditProfileModal
        visible={editVisible}
        onDismiss={() => setEditVisible(false)}
        profile={profile}
        onProfileUpdate={refreshProfile}
      />
      <SettingsModal
        type={activeSettings}
        visible={activeSettings !== null}
        onDismiss={() => setActiveSettings(null)}
      />
      {profile != null && (
        <DeleteAccountModal
          visible={deleteVisible}
          onDismiss={() => setDeleteVisible(false)}
          userId={profile.id}
        />
      )}
    </View>
  );
}
