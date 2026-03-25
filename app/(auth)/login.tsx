import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import useLogin from "@/components/account/login-components/useLogin";
import LoginForm from "@/components/account/login-components/loginForm";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LoginScreen() {
  const loginState = useLogin();
  const router = useRouter();
  const { lang } = useLanguage();

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient style={{ flex: 1 }} colors={gradient_colors} />
        <BackgroundShapes />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={screenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LoginForm state={loginState} />

          <Button
            mode="text"
            onPress={() => router.replace("/(student)")}
            textColor="rgba(255,255,255,0.8)"
            style={screenStyles.guestButton}
            labelStyle={screenStyles.guestButtonLabel}
          >
            {lang === 1 ? "Continue as Guest" : "بەردەوامبە وەک میوان"}
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const screenStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  guestButton: {
    marginTop: 20,
  },
  guestButtonLabel: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
