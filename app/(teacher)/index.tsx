import { useState } from "react";
import { View, ScrollView } from "react-native";
import { styles } from "@/styles/teacher_home_styles";
import Loader from "@/components/Loader";
import EditProfileModal from "@/components/teachers/account/EditProfileModal";
import TeacherHero from "@/components/teachers/teacher-dashboard-components/teacher-hero";
import useTeacherProfile from "@/components/teachers/teacher-dashboard-components/use-teacher-profile";

export default function TeacherDashboard() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { profile, stats, loading, refresh, handleSignOut } =
    useTeacherProfile();

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TeacherHero
          profile={profile}
          stats={stats}
          onEdit={() => setEditModalVisible(true)}
          onSignOut={handleSignOut}
        />
      </ScrollView>

      <EditProfileModal
        visible={editModalVisible}
        onDismiss={() => setEditModalVisible(false)}
        profile={profile}
        onProfileUpdate={refresh}
      />
    </View>
  );
}
