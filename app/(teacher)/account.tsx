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
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={{ alignItems: "center", marginTop: 40, marginBottom: 10 }}>
          <Avatar.Text
            size={90}
            label={profile?.name?.charAt(0) || "U"}
            style={{ backgroundColor: "#325b4d", elevation: 0 }}
            labelStyle={{ color: "#FFF", fontSize: 32, fontFamily: "NRT-Bold" }}
          />
          <Text
            style={{
              marginTop: 16,
              color: "#FFF",
              fontSize: 24,
              fontFamily: "NRT-Bold",
            }}
          >
            {profile?.name}
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
            {text.teacher}
          </Text>
        </View>

        {/* Stats Card */}
        {stats && (
          <StatsCard
            courseNumber={stats.courses_count}
            videoNumber={stats.videos_count}
            studentNumber={stats.students_count}
          />
        )}

        {/* Settings List */}
        <AccountSettingsList
          onEditPress={() => setEditVisible(true)}
          onSettingsPress={(type) => setActiveSettings(type)}
        />

        {/* Buttons Section */}
        <View style={{ gap: 12 }}>
          <SecondaryButton
            text={text.logout}
            action={handleSignOut}
            icon={"logout"}
          />
          <PrimaryButton
            text={text.delete_acc}
            action={() => setDeleteVisible(true)}
            icon={"trash-can"}
          />
        </View>
      </ScrollView>

      {/* Modals remain the same as they are already updated */}
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
