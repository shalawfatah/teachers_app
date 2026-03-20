import React from "react";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { router } from "expo-router";
import { styles } from "@/styles/login_styles";
import { View } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

interface Props {
  state: any;
}

export default function LoginForm({ state }: Props) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;
  return (
    <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
      <Text variant="headlineMedium" style={styles.title}>
        {text.hello}
      </Text>
      <TextInput
        label={text.phone}
        value={state.phone}
        onChangeText={state.setPhone}
        keyboardType="phone-pad"
        style={styles.input}
        mode="outlined"
        disabled={state.loading}
      />

      <TextInput
        label={text.password}
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
        {text.login}
      </Button>
      <Button
        mode="text"
        onPress={() => router.push("/(auth)/signup")}
        disabled={state.loading}
      >
        {text.no_account_create}
      </Button>
    </View>
  );
}
