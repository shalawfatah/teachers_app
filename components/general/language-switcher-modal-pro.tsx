import { View, Modal, Alert, Pressable } from "react-native";
import { Text, IconButton, ActivityIndicator } from "react-native-paper";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

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
    { id: 2, name: "Kurdish", flag: "🇮🇶", code: "ku" },
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

      if (updateError) {
        throw updateError;
      }

      Alert.alert("Success", "Language preference updated!");
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
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onDismiss}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
            width: "90%",
            maxWidth: 400,
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
            <Text variant="titleLarge">Select Language</Text>
            <IconButton icon="close" onPress={onDismiss} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              variant="bodySmall"
              style={{ color: "#666", marginBottom: 5 }}
            >
              Current language:{" "}
              {currentLang === 1 ? "🇬🇧 English" : "🇮🇶 Kurdish"}
            </Text>
          </View>

          {languages.map((lang) => (
            <Pressable
              key={lang.id}
              onPress={() => handleLanguageSelect(lang.id)}
              disabled={loading}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 15,
                backgroundColor:
                  currentLang === lang.id ? "#e3f2fd" : "#f5f5f5",
                borderRadius: 10,
                marginBottom: 10,
                opacity: loading ? 0.5 : 1,
              }}
            >
              <Text style={{ fontSize: 24, marginRight: 10 }}>{lang.flag}</Text>
              <Text variant="titleMedium" style={{ flex: 1 }}>
                {lang.name}
              </Text>
              {currentLang === lang.id && (
                <IconButton icon="check" size={20} iconColor="#4caf50" />
              )}
            </Pressable>
          ))}

          {loading && (
            <View style={{ marginTop: 10, alignItems: "center" }}>
              <ActivityIndicator size="small" />
              <Text style={{ marginTop: 5 }}>Updating...</Text>
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
  );
}
