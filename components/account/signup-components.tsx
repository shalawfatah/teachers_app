import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Card, Text, Dialog, Portal, Button } from "react-native-paper";
import { router } from "expo-router";
import { styles } from "@/styles/signup_styles";
import SignupForm from "../../components/account/signup-components/signup-form";
import useTeachers from "../../components/account/signup-components/use-teachers";
import useSignup from "../../components/account/signup-components/use-signup";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("9");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null,
  );
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);

  const { teachers, loading: teachersLoading } = useTeachers();
  const { loading, error, signup } = useSignup();

  const handleSignup = async () => {
    const success = await signup({
      email,
      password,
      fullName,
      grade,
      teacherId: selectedTeacherId,
    });

    if (success === "email_verification_required") {
      setSuccessDialogVisible(true);
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

            <SignupForm
              email={email}
              password={password}
              fullName={fullName}
              grade={grade}
              selectedTeacherId={selectedTeacherId}
              teachers={teachers}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onFullNameChange={setFullName}
              onGradeChange={setGrade}
              onTeacherSelect={setSelectedTeacherId}
              onSubmit={handleSignup}
              loading={loading || teachersLoading}
              error={error}
            />

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
            <Text>Check {email} to activate your student account.</Text>
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
