import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import useLogin from "@/components/account/login-components/useLogin";
import LoginForm from "@/components/account/login-components/loginForm";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "@/components/backgrounds/BackgroundShapes";

export default function LoginScreen() {
  const loginState = useLogin();

  return (
    <View style={{ flex: 1 }}>
      {/* 1. THE BACKGROUND (Stays fixed) */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient style={{ flex: 1 }} colors={gradient_colors} />
        <BackgroundShapes />
      </View>

      {/* 2. THE INTERACTION LAYER */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={screenStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* We pass the state directly to the form. 
              The form now contains its own BlurView "Card" */}
          <LoginForm state={loginState} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const screenStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center", // Centers the form vertically on the screen
    paddingHorizontal: 20, // Ensures the form doesn't touch the screen edges
  },
});
