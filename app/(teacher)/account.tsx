import { View, ScrollView } from "react-native";
import { Text, List, Avatar, Button, Divider } from "react-native-paper";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/teacher_account_styles";
import StatsCard from "@/components/account/StatsCard";
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
        .from("profiles")
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
          Instructor
        </Text>
      </View>

      <StatsCard courseNumber={12} videoNumber={49} studentNumber={1.5} />
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
            title="Course Settings"
            description="Manage course preferences"
            left={(props) => <List.Icon {...props} icon="cog" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Course settings")}
          />
          <Divider />
          <List.Item
            title="Notifications"
            description="Manage notification preferences"
            left={(props) => <List.Icon {...props} icon="bell" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Notifications")}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Analytics</List.Subheader>
          <List.Item
            title="View Analytics"
            description="See your performance metrics"
            left={(props) => <List.Icon {...props} icon="chart-line" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Analytics")}
          />
          <Divider />
          <List.Item
            title="Revenue"
            description="Track your earnings"
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
            right={(props) => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => console.log("Revenue")}
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
