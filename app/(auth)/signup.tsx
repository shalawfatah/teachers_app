import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Card, Text, Dialog, Portal, Button } from "react-native-paper";
import { router } from "expo-router";
import { styles } from "@/styles/signup_styles";
import { LinearGradient } from "expo-linear-gradient";
import useTeachers from "@/components/account/signup-components/use-teachers";
import useSignup from "@/components/account/signup-components/use-signup";
import SignupForm from "@/components/account/signup-components/signup-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function SignupScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("9");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(
    null,
  );
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);

  const { teachers, loading: teachersLoading } = useTeachers();
  const { loading, error, signup } = useSignup();
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const handleSignup = async () => {
    const fakeEmail = `${phone.replace(/\s+/g, "")}@ravaemail.com`;
    const success = await signup({
      email: fakeEmail,
      password,
      fullName,
      grade,
      teacherId: selectedTeacherId,
    });

    if (success) {
      setSuccessDialogVisible(true);
    }
  };

  return (
    <LinearGradient
      colors={["#FF8C00", "#FF0080"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="headlineMedium" style={styles.title}>
                {text.register_student}
              </Text>

              <SignupForm
                phone={phone}
                password={password}
                fullName={fullName}
                grade={grade}
                selectedTeacherId={selectedTeacherId}
                teachers={teachers}
                onPhoneChange={setPhone}
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
                // Ensure the "Back" button text is visible on the gradient/glass
                labelStyle={{ color: "#ffffff" }}
              >
                {text.have_account_sign_in}
              </Button>
            </Card.Content>
          </Card>
        </ScrollView>

        <Portal>
          <Dialog
            visible={successDialogVisible}
            onDismiss={() => router.replace("/(auth)/login")}
          >
            <Dialog.Title>{text.account_created}</Dialog.Title>
            <Dialog.Content>
              <Text>{text.account_created_message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => router.replace("/(auth)/login")}>
                {text.got_it}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
