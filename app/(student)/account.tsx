import { View, ScrollView } from "react-native";
import { Text, List, Avatar, Button, Divider } from "react-native-paper";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/account_styles";
import { Student } from "@/types/profile";
import EditProfileModal from "@/components/students/account/EditProfileModal";
import SettingsModal, {
  SettingsType,
} from "@/components/students/account/SettingsModal";

export default function AccountScreen() {
  const [profile, setProfile] = useState<Student | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSettingsType, setActiveSettingsType] =
    useState<SettingsType>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase
        .from("students")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  return (
    <>
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
            خوێندکار
          </Text>
        </View>
        <View style={styles.settingsContainer}>
          <List.Section>
            <List.Subheader>سازاندنی هەژمار</List.Subheader>

            <List.Item
              title="نوێکردنەوەی هەژمار"
              description="زانیارییەکانت نوێبکەرەوە"
              left={(props) => <List.Icon {...props} icon="account-edit" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => setIsModalVisible(true)}
            />
            <Divider />
            <List.Item
              title="نۆتیفیکەیشن"
              description="سازاندنی نۆتیفیکەیشن"
              left={(props) => <List.Icon {...props} icon="bell" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => setActiveSettingsType("notifications")}
            />
            <Divider />
            <List.Item
              title="پاراستنی زانیاری"
              description="پاراستنی زانیاریی و اسایشی ئەپ"
              left={(props) => <List.Icon {...props} icon="shield-account" />}
              right={(props) => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => setActiveSettingsType("privacy")}
            />
          </List.Section>
          <List.Section>
            <List.Subheader>Support</List.Subheader>
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
      </ScrollView>
      <EditProfileModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        profile={profile}
        onProfileUpdate={getProfile}
      />
      <SettingsModal
        type={activeSettingsType}
        visible={activeSettingsType !== null}
        onDismiss={() => setActiveSettingsType(null)}
      />
    </>
  );
}
