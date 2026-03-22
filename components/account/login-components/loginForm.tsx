import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { style_vars } from "@/utils/style_vars";

export default function LoginForm({ state }: any) {
  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const inputTheme = {
    colors: {
      onSurfaceVariant: "rgba(255, 255, 255, 0.6)",
      primary: "#ffffff",
      outline: "rgba(255, 255, 255, 0.2)",
    },
  };

  return (
    <BlurView intensity={40} tint="light" style={formStyles.glassContainer}>
      <View style={{ direction: isRTL ? "rtl" : "ltr" }}>
        <Text style={formStyles.title}>{text.hello}</Text>

        <TextInput
          label={text.phone}
          value={state.phone}
          onChangeText={state.setPhone}
          keyboardType="phone-pad"
          mode="outlined"
          textColor="#FFF"
          style={formStyles.input}
          theme={inputTheme}
        />

        <TextInput
          label={text.password}
          value={state.password}
          onChangeText={state.setPassword}
          secureTextEntry
          mode="outlined"
          textColor="#FFF"
          style={formStyles.input}
          theme={inputTheme}
        />

        {state.error && (
          <HelperText type="error" visible style={{ color: "#FF6B6B" }}>
            {state.error}
          </HelperText>
        )}

        <Button
          mode="contained"
          onPress={state.handleLogin}
          loading={state.loading}
          disabled={state.loading}
          style={formStyles.loginBtn}
          labelStyle={formStyles.btnLabel}
          contentStyle={{ height: 55 }}
        >
          {text.login}
        </Button>

        <Button
          mode="text"
          onPress={() => router.push("/(auth)/signup")}
          labelStyle={{ color: "rgba(255,255,255,0.7)", marginTop: 10 }}
        >
          {text.no_account_create}
        </Button>
      </View>
    </BlurView>
  );
}

const formStyles = StyleSheet.create({
  glassContainer: {
    padding: 30,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    overflow: "hidden",
    width: "100%",
  },
  title: {
    fontSize: 28,
    color: "#FFF",
    fontFamily: style_vars.PRIMARY_FONT,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 15,
  },
  btnLabel: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
