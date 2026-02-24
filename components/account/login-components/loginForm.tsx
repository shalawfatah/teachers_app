import React from "react";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { router } from "expo-router";
import { styles } from "@/styles/login_styles";
import { View } from "react-native";

interface Props {
  state: any;
}

export default function LoginForm({ state }: Props) {
  return (
    <View style={{ direction: "rtl" }}>
      <Text variant="headlineMedium" style={styles.title}>
        سڵاو
      </Text>
      <TextInput
        label="ئیمەیل"
        value={state.email}
        onChangeText={state.setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        mode="outlined"
        disabled={state.loading}
      />
      <TextInput
        label="وشەی نهێنی"
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
        چوونە ناو هەژمار
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/(auth)/signup")}
        disabled={state.loading}
      >
        گەر هەژمارت نیە، دروستی بکە
      </Button>
    </View>
  );
}
