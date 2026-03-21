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

  // This shared theme object ensures the labels and cursors are white
  const inputTheme = {
    colors: {
      onSurfaceVariant: "rgba(255, 255, 255, 0.7)", // Label/Placeholder color
      primary: "#ffffff", // Cursor and active underline color
    },
  };

  return (
    <View style={[styles.container, { direction: isRTL ? "rtl" : "ltr" }]}>
      <Text variant="headlineMedium" style={styles.title}>
        {text.hello}
      </Text>

      <TextInput
        placeholder={text.phone}
        value={state.phone}
        onChangeText={state.setPhone}
        keyboardType="phone-pad"
        style={styles.input}
        contentStyle={{ textAlign: isRTL ? "right" : "left" }}
        mode="outlined"
        disabled={state.loading}
        // --- NEW PROPS START ---
        textColor="#ffffff"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        outlineColor="rgba(255, 255, 255, 0.4)" // Dormant white border
        activeOutlineColor="#ffffff" // Focused white border
        theme={inputTheme}
      // --- NEW PROPS END ---
      />

      <TextInput
        placeholder={text.password}
        value={state.password}
        onChangeText={state.setPassword}
        secureTextEntry
        style={styles.input}
        contentStyle={{ textAlign: isRTL ? "right" : "left" }}
        mode="outlined"
        disabled={state.loading}
        // --- NEW PROPS START ---
        textColor="#ffffff"
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        outlineColor="rgba(255, 255, 255, 0.4)"
        activeOutlineColor="#ffffff"
        theme={inputTheme}
      // --- NEW PROPS END ---
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
        // --- NEW PROPS START ---
        labelStyle={{ color: "#1a1a1a", fontFamily: "NRT-Bold" }} // Dark text for the white button
      // --- NEW PROPS END ---
      >
        {text.login}
      </Button>

      <Button
        mode="text"
        onPress={() => router.push("/(auth)/signup")}
        disabled={state.loading}
        // --- NEW PROPS START ---
        labelStyle={{ color: "#ffffff" }} // White text for the "no account" link
      // --- NEW PROPS END ---
      >
        {text.no_account_create}
      </Button>
    </View>
  );
}
