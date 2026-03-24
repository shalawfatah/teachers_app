import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, TextInput, Button } from "react-native-paper";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { style_vars } from "@/utils/style_vars";
import { EditStudentModalProps } from "@/types/modal";
import { useEditProfile } from "./student-account-components/useEditProfile";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { gradient_colors } from "@/utils/gradient_colors";
import GlassDropdown from "@/components/general/glass-dropdown";
import RavaLabel from "@/components/general/rava-label";

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

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalWrapper}
      >
        <LinearGradient colors={gradient_colors} style={{ borderRadius: 28 }}>
          <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
            <Text variant="headlineSmall" style={styles.title}>
              {text.update_acc}
            </Text>
            <RavaLabel label={text.name} />

            <TextInput
              label={text.name}
              value={name}
              onChangeText={setName}
              mode="outlined"
              textColor="#fff"
              theme={{
                colors: { primary: "#fff", outline: "rgba(255,255,255,0.4)" },
              }}
              style={[styles.input, {textAlign: isRTL ? "right" : "left"}]}
            />
            <GlassDropdown
              label={text.class}
              value={grade}
              options={grades}
              onSelect={setGrade}
              isRTL={isRTL}
            />

            <View
              style={[
                styles.buttonRow,
                { flexDirection: isRTL ? "row-reverse" : "row" },
              ]}
            >
              <Button
                mode="contained"
                onPress={handleUpdate}
                loading={updating}
                disabled={updating || !name}
                style={styles.submitBtn}
                labelStyle={styles.submitLabel}
              >
                {text.update}
              </Button>

              <Button
                mode="text"
                onPress={onDismiss}
                textColor="#fff"
                style={{ flex: 1 }}
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

const styles = StyleSheet.create({
  modalWrapper: {
    margin: 20,
  },
  blurContainer: {
    padding: 24,
    borderRadius: 28,
  },
  title: {
    color: "#fff",
    fontFamily: style_vars.PRIMARY_FONT,
    marginBottom: 25,
    fontWeight: "900",
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginBottom: 20,
    fontFamily: style_vars.PRIMARY_FONT,
  },
  buttonRow: {
    marginTop: 10,
    gap: 10,
  },
  submitBtn: {
    backgroundColor: "#fff",
    flex: 2,
    borderRadius: 12,
  },
  submitLabel: {
    color: "#000",
    fontWeight: "bold",
    fontFamily: style_vars.PRIMARY_FONT,
  },
});
