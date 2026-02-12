import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  Paragraph,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("9");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);

  const handleSignup = async () => {
    setError("");

    // Basic Validation
    if (!fullName.trim()) return setError("Please enter your full name");
    if (!email.trim()) return setError("Please enter your email");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);

    try {
      console.log("Starting signup for:", email);

      // We pass 'name' and 'grade' inside the options.data object.
      // The Postgres Trigger reads this from 'raw_user_meta_data'.
      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: {
              name: fullName,
              grade: grade,
            },
          },
        },
      );

      if (signUpError) {
        // If the trigger fails, the error will pop up here.
        console.error("Signup error:", signUpError);
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      console.log("Auth success. Student record created via DB Trigger.");

      // Check if user is automatically signed in (depends on Supabase "Confirm Email" setting)
      if (authData.session) {
        router.replace("/(tabs)");
      } else {
        setSuccessDialogVisible(true);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDialogDismiss = () => {
    setSuccessDialogVisible(false);
    router.replace("/(auth)/login");
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
              Create Student Account
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

            {error ? (
              <HelperText
                type="error"
                visible={!!error}
                style={styles.errorText}
              >
                {error}
              </HelperText>
            ) : null}

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
        <Dialog visible={successDialogVisible} onDismiss={handleDialogDismiss}>
          <Dialog.Title>Check Your Email</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              We've sent a confirmation email to {email}. Please verify your
              email to log in.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDialogDismiss}>Got it</Button>
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
  gradeLabel: { marginTop: 8, marginBottom: 8 },
  segmented: { marginBottom: 12 },
  button: { marginTop: 8, marginBottom: 8 },
  errorText: { fontSize: 12 },
});
