import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, Portal, Dialog, Button } from "react-native-paper";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import useTeachers from "@/components/account/signup-components/use-teachers";
import useSignup from "@/components/account/signup-components/use-signup";
import SignupForm from "@/components/account/signup-components/signup-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import { style_vars } from "@/utils/style_vars";

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
  const { lang, isRTL } = useLanguage();
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
    if (success) setSuccessDialogVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* BACKGROUND LAYER */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient colors={gradient_colors} style={{ flex: 1 }} />
        <BackgroundShapes />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* GLASS WRAPPER */}
          <BlurView intensity={30} tint="light" style={styles.glassCard}>
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
              labelStyle={{ color: "rgba(255,255,255,0.7)", marginTop: 10 }}
            >
              {text.have_account_sign_in}
            </Button>
          </BlurView>
        </ScrollView>

        <Portal>
          {/* DIALOG ALSO NEEDS GLASS STYLE */}
          <Dialog
            visible={successDialogVisible}
            onDismiss={() => router.replace("/(auth)/login")}
            style={{
              backgroundColor: "rgba(30, 30, 30, 0.95)",
              borderRadius: 20,
            }}
          >
            <Dialog.Title style={{ color: "#FFF" }}>
              {text.account_created}
            </Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: "rgba(255,255,255,0.7)" }}>
                {text.account_created_message}
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                textColor="#FFF"
                onPress={() => router.replace("/(auth)/login")}
              >
                {text.got_it}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 60, // Extra space for long forms
  },
  glassCard: {
    padding: 25,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
    width: "100%",
  },
  title: {
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    textAlign: "center",
    marginBottom: 25,
    fontWeight: "bold",
  },
});
