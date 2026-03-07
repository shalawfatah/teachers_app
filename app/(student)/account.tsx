import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Text, Avatar, Button } from "react-native-paper";
import EditProfileModal from "@/components/students/account/EditProfileModal";
import SettingsModal from "@/components/students/account/SettingsModal";
import { SettingsType } from "@/types/modal";
import StudentSettingsList from "../../components/students/student-account-components/StudentSettingsList";
import useStudentAccount from "../../components/students/student-account-components/useStudentAccount";
import { styles } from "@/styles/account_styles";

export default function AccountScreen() {
  const { profile, loading, handleSignOut, refreshProfile } =
    useStudentAccount();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSettingsType, setActiveSettingsType] =
    useState<SettingsType>(null);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <Avatar.Text
            size={80}
            label={profile?.name?.charAt(0) || "U"}
          />
          <Text variant="headlineSmall">
            {profile?.name}
          </Text>
          <Text variant="bodyMedium">
            خوێندکار
          </Text>
        </View>

        <StudentSettingsList
          onEditPress={() => setIsModalVisible(true)}
          onSettingsPress={setActiveSettingsType}
        />

        <View style={styles.signOutContainer}>
          <Button
            mode="outlined"
            onPress={handleSignOut}
            loading={loading}
            disabled={loading}
            style={styles.signOutButton}
            textColor="#d32f2f"
          >
            دەرچوون لە ئەپ
          </Button>
        </View>
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
    </>
  );
}
