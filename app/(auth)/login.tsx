import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "@/styles/login_styles";
import useLogin from "@/components/account/login-components/useLogin";
import LoginForm from "@/components/account/login-components/loginForm";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
  const loginState = useLogin();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient style={styles.container} colors={["#FF8C00", "#FF0080"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <Card.Content>
              <LoginForm state={loginState} />
            </Card.Content>
          </Card>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
