import {style_vars} from "@/utils/style_vars";
import { View, Modal, Alert, Pressable, Platform } from "react-native";
import { Text, IconButton, ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { BlurView } from "expo-blur"; // Import BlurView
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient
import { gradient_colors } from "@/utils/gradient_colors";

interface LanguageSwitcherModalProps {
  visible: boolean;
  onDismiss: () => void;
  currentLang: number;
  profileId: string;
  onLanguageChange: () => void;
}

export default function LanguageSwitcherModal({
  visible,
  onDismiss,
  currentLang,
  onLanguageChange,
}: LanguageSwitcherModalProps) {
  const [loading, setLoading] = useState(false);

  const languages = [
    { id: 1, name: "English", flag: "🇬🇧", code: "en" },
    { id: 2, name: "Kurdish", flag: "☀️", code: "ku" }, // Updated flag to match your dashboard
  ];

  const handleLanguageSelect = async (langId: number) => {
    if (langId === currentLang) {
      onDismiss();
      return;
    }
    setLoading(true);
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError || !session) {
        Alert.alert("Error", "You must be logged in to change language");
        return;
      }
      const { error: updateError } = await supabase
        .from("students")
        .update({ lang: langId })
        .eq("id", session.user.id);

      if (updateError) throw updateError;
      onLanguageChange();
      onDismiss();
    } catch (error: any) {
      Alert.alert("Error", `Failed to update language: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable style={{ flex: 1 }} onPress={onDismiss}>
        <BlurView
          intensity={Platform.OS === "ios" ? 30 : 100}
          tint="dark"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LinearGradient
            colors={gradient_colors}
            style={{
              borderRadius: 24,
              padding: 24,
              width: "85%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: "rgba(0, 0, 0, 0.6)",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                variant="titleLarge"
                style={{ color: "#FFF", fontFamily: style_vars.PRIMARY_FONT }}
              >
                Select Language
              </Text>
              <IconButton icon="close" iconColor="#FFF" onPress={onDismiss} />
            </View>

            {languages.map((lang) => (
              <Pressable
                key={lang.id}
                onPress={() => handleLanguageSelect(lang.id)}
                disabled={loading}
                style={({ pressed }) => ({
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 16,
                  // If selected, bright transparent white. If not, very subtle transparent white.
                  backgroundColor:
                    currentLang === lang.id
                      ? "rgba(255, 255, 255, 0.25)"
                      : "rgba(255, 255, 255, 0.1)",
                  borderRadius: 12,
                  marginBottom: 12,
                  opacity: loading ? 0.5 : pressed ? 0.8 : 1,
                  borderWidth: 1,
                  borderColor:
                    currentLang === lang.id
                      ? "rgba(255, 255, 255, 0.4)"
                      : "transparent",
                })}
              >
                <Text style={{ fontSize: 24, marginRight: 12 }}>
                  {lang.flag}
                </Text>
                <Text
                  variant="titleMedium"
                  style={{ flex: 1, color: "#FFF", fontFamily: style_vars.PRIMARY_FONT }}
                >
                  {lang.name}
                </Text>
                {currentLang === lang.id && (
                  <IconButton
                    icon="check-circle"
                    size={20}
                    iconColor="#99f2c8"
                    style={{ margin: 0 }}
                  />
                )}
              </Pressable>
            ))}

            {loading && (
              <View style={{ marginTop: 10, alignItems: "center" }}>
                <ActivityIndicator size="small" color="#FFF" />
                <Text style={{ marginTop: 8, color: "#FFF" }}>Updating...</Text>
              </View>
            )}
          </LinearGradient>
        </BlurView>
      </Pressable>
    </Modal>
  );
}
