import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, Avatar, Button } from "react-native-paper";
import { styles } from "@/styles/teacher_account_styles";
import StatsCard from "@/components/account/StatsCard";
import EditProfileModal from "@/components/teachers/account/EditProfileModal";
import SettingsModal from "@/components/teachers/account/SettingsModal";
import DeleteAccountModal from "@/components/teachers/account/DeleteAccountModal";
import { SettingsType } from "@/types/modal";
import useTeacherAccount from "@/components/teachers/teacher-account-components/useTeacherAccount";
import AccountSettingsList from "@/components/teachers/teacher-account-components/AccountSettingsList";

export default function AccountScreen() {
  const { profile, stats, loading, handleSignOut, refreshProfile } =
    useTeacherAccount();
  const [editVisible, setEditVisible] = useState(false);
  const [activeSettings, setActiveSettings] = useState<SettingsType>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar.Text
          size={80}
          label={profile?.name?.charAt(0) || "U"}
          style={styles.avatar}
        />
        <Text variant="headlineSmall" style={styles.name}>
          {profile?.name}
        </Text>
        <Text variant="bodyMedium" style={styles.role}>
          مامۆستا
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

      <View style={styles.signOutContainer}>
        <Button
          mode="outlined"
          onPress={handleSignOut}
          loading={loading}
          style={styles.signOutButton}
          textColor="#d32f2f"
        >
          دەرچوون لە ئەپ
        </Button>
      </View>

      <View style={styles.deleteAccountContainer}>
        <Button
          mode="outlined"
          onPress={() => setDeleteVisible(true)}
          loading={loading}
          style={styles.deleteAccountButton}
          textColor="#FFFFFF"
        >
          سڕینەوەی هەژمار
        </Button>
      </View>

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
      {profile != null ? (
        <DeleteAccountModal
          visible={deleteVisible}
          onDismiss={() => setDeleteVisible(false)}
          userId={profile.id}
        />
      ) : null}
    </ScrollView>
  );
}
