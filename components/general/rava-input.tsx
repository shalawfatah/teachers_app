import React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { useLanguage } from "@/contexts/LanguageContext";

export const inputTheme = {
  colors: {
    onSurfaceVariant: "rgba(255, 255, 255, 0.7)",
    primary: "#ffffff",
  },
};

interface RavaInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  loading?: boolean;
  label?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
  style?: ViewStyle | ViewStyle[];
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export default function RavaInput({
  placeholder,
  value,
  onChangeText,
  loading = false,
  label,
  secureTextEntry = false,
  keyboardType = "default",
  left,
  right,
}: RavaInputProps) {
  const { isRTL } = useLanguage();

  const alignmentStyle: TextStyle = {
    textAlign: isRTL ? "right" : "left",
    fontFamily: "NRT-Bold",
  };

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
      disabled={loading}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      placeholderTextColor="rgba(255, 255, 255, 0.5)"
      textColor="#ffffff"
      outlineColor="rgba(255, 255, 255, 0.3)"
      activeOutlineColor="#ffffff"
      style={styles.input}
      contentStyle={alignmentStyle}
      theme={inputTheme}
      outlineStyle={{ borderRadius: 12, borderWidth: 1 }}
      left={left}
      right={right}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    fontSize: 14,
    marginBottom: 12,
    width: "100%",
  },
});
