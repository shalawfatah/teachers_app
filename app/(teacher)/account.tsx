import { View, ScrollView } from "react-native";
import { Text, List, Avatar, Button, Divider } from "react-native-paper";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/teacher_account_styles";
import { Teacher } from "@/types/profile";
import StatsCard from "@/components/account/StatsCard";
import EditProfileModal from "@/components/teachers/account/EditProfileModal";
import { TeacherStats } from "@/types/teacher";
import SettingsModal, {
  SettingsType,
} from "@/components/teachers/account/SettingsModal";

export default function AccountScreen() {
  const [profile, setProfile] = useState<Teacher | null>(null);
  const [stats, setStats] = useState<TeacherStats>();
  const [loading, setLoading] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [activeSettingsType, setActiveSettingsType] =
    useState<SettingsType>(null);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile?.id) {
      getStats();
    }
  }, [profile]);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("teachers")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }
  };

  const getStats = async () => {
    const { data, error } = await supabase.rpc("get_teacher_stats", {
      teacher_uuid: profile?.id,
    });
    if (error) {
      console.log(error);
    }
    setStats(data[0]);
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

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

      {stats !== undefined ? (
        <StatsCard
          courseNumber={stats.courses_count}
          videoNumber={stats.videos_count}
          studentNumber={stats.students_count}
        />
      ) : null}

      <View style={styles.settingsContainer}>
        <List.Section>
          <List.Subheader>سازاندنی هەژمار</List.Subheader>
          <List.Item
            title="نوێکردنەوەی هەژمار"
            description="زانیارییەکانت نوێبکەرەوە"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setEditModalVisible(true)}
          />
          <Divider />
        </List.Section>

        <List.Section>
          <List.Subheader>پشتیوانی</List.Subheader>
          <List.Item
            title="یارمەتی"
            description="پشتیوانی و یارمەتی"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setActiveSettingsType("help")}
          />
          <Divider />
          <List.Item
            title="دەربارە"
            description="زانیاری و ڤێرژنی ئەپ"
            left={(props) => <List.Icon {...props} icon="information" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => setActiveSettingsType("about")}
          />
        </List.Section>
      </View>

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

      <EditProfileModal
        visible={editModalVisible}
        onDismiss={() => setEditModalVisible(false)}
        profile={profile}
        onProfileUpdate={getProfile}
      />
      <SettingsModal
        type={activeSettingsType}
        visible={activeSettingsType !== null}
        onDismiss={() => setActiveSettingsType(null)}
      />
    </ScrollView>
  );
}
