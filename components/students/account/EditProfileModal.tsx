import {style_vars} from "@/utils/style_vars";
import React from "react";
import { View, Platform } from "react-native";
import { Modal, Portal, Text, TextInput, Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { EditStudentModalProps } from "@/types/modal";
import { styles } from "@/styles/edit_profile_student_styles";
import { useEditProfile } from "./student-account-components/useEditProfile";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { gradient_colors } from "@/utils/gradient_colors";

export default function EditProfileModal({
  visible,
  onDismiss,
  profile,
  onProfileUpdate,
}: EditStudentModalProps) {
  const { name, setName, grade, setGrade, updating, handleUpdate } =
    useEditProfile({
      profile,
      visible,
      onSuccess: onProfileUpdate,
      onClose: onDismiss,
    });

  const { lang, isRTL } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  const grades = [
    { value: "7", label: `7 ${text.class}` },
    { value: "8", label: `8 ${text.class}` },
    { value: "9", label: `9 ${text.class}` },
    { value: "10", label: `10 ${text.class}` },
    { value: "11", label: `11 ${text.class}` },
    { value: "12", label: `12 ${text.class}` },
  ];

  const inputTheme = {
    colors: {
      onSurfaceVariant: "rgba(255, 255, 255, 0.7)",
      primary: "#ffffff",
    },
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.container,
          {
            direction: isRTL ? "rtl" : "ltr",
            padding: 0,
            overflow: "hidden",
            backgroundColor: "transparent",
            margin: 20,
          },
        ]}
      >
        <LinearGradient colors={gradient_colors} style={{ borderRadius: 24 }}>
          <BlurView
            intensity={90}
            tint="dark"
            style={{ padding: 24, borderRadius: 24 }}
          >
            <Text
              variant="headlineSmall"
              style={[
                styles.title,
                { color: "#fff", fontFamily: style_vars.PRIMARY_FONT, marginBottom: 20 },
              ]}
            >
              {text.update_acc}
            </Text>

            {/* Name Input */}
            <TextInput
              label={text.name}
              value={name}
              onChangeText={setName}
              mode="outlined"
              textColor="#fff"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              outlineColor="rgba(255, 255, 255, 0.4)"
              activeOutlineColor="#fff"
              theme={inputTheme}
              style={[
                styles.input,
                {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  textAlign: isRTL ? "right" : "left",
                  marginBottom: 16,
                },
              ]}
            />

            {/* Class Label */}
            <Text
              variant="bodyMedium"
              style={{ color: "#fff", fontFamily: style_vars.PRIMARY_FONT, marginBottom: 8 }}
            >
              {text.class}
            </Text>

            {/* Picker Container - Fixed for iOS/Android stability */}
            <View
              style={{
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.4)",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                marginBottom: 24,
                // On iOS, the Picker needs its own height to avoid "hopping"
                height: Platform.OS === "ios" ? 150 : 55,
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <Picker
                selectedValue={grade}
                onValueChange={(itemValue) => setGrade(itemValue)}
                style={{
                  color: "#ffffff",
                  // Center the picker text for a cleaner look
                  marginHorizontal: Platform.OS === "ios" ? 0 : 8,
                }}
                itemStyle={{
                  color: "#fff",
                  fontFamily: style_vars.PRIMARY_FONT,
                  fontSize: 18,
                  height: Platform.OS === "ios" ? 150 : 55,
                }}
                dropdownIconColor="#ffffff"
                mode="dropdown" // Better behavior on Android
              >
                {grades.map((g) => (
                  <Picker.Item
                    key={g.value}
                    label={g.label}
                    value={g.value}
                    // Android dropdown usually needs darker text if the menu background is light
                    color={Platform.OS === "ios" ? "#FFFFFF" : "#000000"}
                  />
                ))}
              </Picker>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={handleUpdate}
                loading={updating}
                disabled={updating || !name}
                style={[
                  styles.button,
                  {
                    backgroundColor: "#fff",
                    flex: 1,
                    marginRight: isRTL ? 0 : 8,
                    marginLeft: isRTL ? 8 : 0,
                  },
                ]}
                labelStyle={{ color: "#000", fontFamily: style_vars.PRIMARY_FONT }}
              >
                {text.update}
              </Button>
              <Button
                mode="text"
                onPress={onDismiss}
                textColor="#fff"
                labelStyle={{ fontFamily: style_vars.PRIMARY_FONT }}
              >
                {text.cancel}
              </Button>
            </View>
          </BlurView>
        </LinearGradient>
      </Modal>
    </Portal>
  );
}
