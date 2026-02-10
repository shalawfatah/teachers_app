import { View, StyleSheet, ScrollView } from "react-native";
import { Text, List, Avatar, Button, Divider, Card } from "react-native-paper";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  full_name: string;
  role: string;
}

export default function AccountScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
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
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Avatar.Text
          size={80}
          label={profile?.full_name?.charAt(0) || "U"}
          style={styles.avatar}
        />
        <Text variant="headlineSmall" style={styles.name}>
          {profile?.full_name}
        </Text>
        <Text variant="bodyMedium" style={styles.role}>
          Instructor
        </Text>
      </View>

      {/* Stats Card */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={styles.statNumber}>
                156
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Videos
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={styles.statNumber}>
                12
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Courses
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={styles.statNumber}>
                1.2K
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Students
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Settings List */}
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

      {/* Sign Out Button */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 24,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "#6200ee",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  role: {
    color: "#666",
  },
  statsCard: {
    margin: 16,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#e0e0e0",
  },
  statNumber: {
    fontWeight: "bold",
    color: "#6200ee",
  },
  statLabel: {
    color: "#666",
    marginTop: 4,
  },
  settingsContainer: {
    backgroundColor: "#fff",
    marginTop: 8,
  },
  signOutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  signOutButton: {
    borderColor: "#d32f2f",
  },
});
