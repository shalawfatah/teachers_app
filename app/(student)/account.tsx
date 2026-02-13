import { View, ScrollView } from "react-native";
import { Text, List, Avatar, Button, Divider, Card } from "react-native-paper";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/account_styles";
import { Student } from "@/types/profile";

export default function AccountScreen() {
  const [profile, setProfile] = useState<Student | null>(null);
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
          Student
        </Text>
      </View>
      <View style={styles.settingsContainer}>
        <List.Section>
          <List.Subheader>Account Settings</List.Subheader>

          <List.Item
            title="Edit Profile"
            description="Update your personal information"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Edit profile")}
          />
          <Divider />
          <List.Item
            title="Notifications"
            description="Manage notification preferences"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Notifications")}
          />
          <Divider />
          <List.Item
            title="Privacy"
            description="Privacy and security settings"
            left={(props) => <List.Icon {...props} icon="shield-account" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Privacy")}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Support</List.Subheader>
          <List.Item
            title="Help Center"
            description="Get help and support"
            left={(props) => <List.Icon {...props} icon="help-circle" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Help")}
          />
          <Divider />
          <List.Item
            title="About"
            description="App version and info"
            left={(props) => <List.Icon {...props} icon="information" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("About")}
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
          Sign Out
        </Button>
      </View>
    </ScrollView>
  );
}
