import { useState, useEffect } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Card,
  HelperText,
  SegmentedButtons,
  Dialog,
  Portal,
  Menu,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

// Define a type for our teacher list
type Teacher = {
  id: string;
  name: string;
};

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("9");

  // Teacher selection states
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);

  // Load teachers from the database when the screen opens
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    const { data, error } = await supabase
      .from("teachers")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching teachers:", error);
    } else {
      setTeachers(data || []);
    }
  };

  const handleSignup = async () => {
    setError("");

    if (!fullName.trim()) return setError("Please enter your full name");
    if (!email.trim()) return setError("Please enter your email");
    if (!selectedTeacher) return setError("Please select your teacher");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              name: fullName,
              grade: grade,
              teacher_id: selectedTeacher.id, // Passed to your DB trigger
            },
          },
        },
      );

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (authData.session) {
        router.replace("/(tabs)");
      } else {
        setSuccessDialogVisible(true);
      }
    } catch (err) {
      console.log('err signup ', err)
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Student Registration
            </Text>

            <TextInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
              mode="outlined"
              disabled={loading}
            />

            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              mode="outlined"
              disabled={loading}
            />

            {/* TEACHER DROPDOWN MENU */}
            <View style={styles.dropdownContainer}>
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Button
                    mode="outlined"
                    onPress={() => setMenuVisible(true)}
                    style={styles.dropdownButton}
                    contentStyle={styles.dropdownButtonContent}
                    icon="chevron-down"
                  >
                    {selectedTeacher
                      ? `Teacher: ${selectedTeacher.name}`
                      : "Select Your Teacher"}
                  </Button>
                }
              >
                {teachers.length > 0 ? (
                  teachers.map((t) => (
                    <Menu.Item
                      key={t.id}
                      onPress={() => {
                        setSelectedTeacher(t);
                        setMenuVisible(false);
                      }}
                      title={t.name}
                    />
                  ))
                ) : (
                  <Menu.Item title="No teachers found" disabled />
                )}
              </Menu>
            </View>

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
              disabled={loading}
            />

            <Text variant="labelLarge" style={styles.gradeLabel}>
              Grade Level
            </Text>
            <SegmentedButtons
              value={grade}
              onValueChange={setGrade}
              buttons={[
                { value: "7", label: "7" },
                { value: "8", label: "8" },
                { value: "9", label: "9" },
              ]}
              style={styles.segmented}
              disabled={loading}
            />
            <SegmentedButtons
              value={grade}
              onValueChange={setGrade}
              buttons={[
                { value: "10", label: "10" },
                { value: "11", label: "11" },
                { value: "12", label: "12" },
              ]}
              style={styles.segmented}
              disabled={loading}
            />

            {error ? <HelperText type="error">{error}</HelperText> : null}

            <Button
              mode="contained"
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Sign Up
            </Button>

            <Button
              mode="text"
              onPress={() => router.back()}
              disabled={loading}
            >
              Already have an account? Login
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>

      <Portal>
        <Dialog
          visible={successDialogVisible}
          onDismiss={() => router.replace("/(auth)/login")}
        >
          <Dialog.Title>Verify Email</Dialog.Title>
          <Dialog.Content>
            <Text>
              Check {email} to activate your student account.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => router.replace("/(auth)/login")}>
              Got it
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 16 },
  card: { padding: 16 },
  title: { textAlign: "center", marginBottom: 24 },
  input: { marginBottom: 12 },
  dropdownContainer: { marginBottom: 12 },
  dropdownButton: { borderRadius: 4, borderColor: "#79747E" },
  dropdownButtonContent: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    height: 50,
  },
  gradeLabel: { marginTop: 8, marginBottom: 8 },
  segmented: { marginBottom: 8 },
  button: { marginTop: 16, marginBottom: 8 },
});
