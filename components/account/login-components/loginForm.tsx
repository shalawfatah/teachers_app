import React from "react";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { router } from "expo-router";
import { styles } from "@/styles/login_styles";

interface Props {
  state: any;
}

export default function LoginForm({ state }: Props) {
  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome Back
      </Text>
      <TextInput
        label="Email"
        value={state.email}
        onChangeText={state.setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
        disabled={state.loading}
      />
      <TextInput
        label="Password"
        value={state.password}
        onChangeText={state.setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
        disabled={state.loading}
      />
      {state.error ? (
        <HelperText type="error" visible={!!state.error}>
          {state.error}
        </HelperText>
      ) : null}
      <Button
        mode="contained"
        onPress={state.handleLogin}
        loading={state.loading}
        disabled={state.loading}
        style={styles.button}
      >
        Login
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/(auth)/signup")}
        disabled={state.loading}
      >
        No account? Sign up
      </Button>
    </>
  );
}
