import { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text, Card, HelperText } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      // 1. Authenticate the user
      const { data: authData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      const user = authData?.user;
      if (!user) throw new Error("No user found");

      // 2. Check if the user exists in the 'teachers' table
      const { data: teacher, error: tError } = await supabase
        .from("teachers")
        .select("id")
        .eq("id", user.id)
        .single();

      if (teacher) {
        console.log("Verified as Teacher. Redirecting...");
        router.replace("/(teacher)");
        return;
      }

      // 3. If not a teacher, check if they are in the 'students' table
      const { data: student, error: sError } = await supabase
        .from("students")
        .select("id")
        .eq("id", user.id)
        .single();

      if (student) {
        console.log("Verified as Student. Redirecting...");
        router.replace("/(student)");
        return;
      }

      // 4. Fallback if user exists in Auth but not in either table
      setError("User record not found in database. Please contact support.");
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred during role verification.");
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
              Welcome Back
            </Text>

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
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Login
            </Button>

            <Button
              mode="text"
              onPress={() => router.push("/(auth)/signup")}
              disabled={loading}
            >
              Don't have an account? Sign up
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: "center", padding: 16 },
  card: { padding: 16 },
  title: { textAlign: "center", marginBottom: 24 },
  input: { marginBottom: 12 },
  button: { marginTop: 8, marginBottom: 8 },
  errorText: { marginBottom: 8 },
});
