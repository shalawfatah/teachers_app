import React from "react";
import { View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  SegmentedButtons,
} from "react-native-paper";
import { EditStudentModalProps } from "@/types/modal";
import { styles } from "@/styles/edit_profile_student_styles";
import { edit_profile_modal_buttons } from "@/utils/edit_profile_modal_buttons";
import { useEditProfile } from "./student-account-components/useEditProfile";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

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
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Text variant="headlineSmall" style={styles.title}>
          {text.update_acc}
        </Text>

        <TextInput
          label={text.name}
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.label}>
          {text.class}
        </Text>

        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.gradeScroll}
          >
            <SegmentedButtons
              value={grade}
              onValueChange={setGrade}
              buttons={edit_profile_modal_buttons}
              style={styles.segment}
            />
          </ScrollView>
        </View>

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={handleUpdate}
            loading={updating}
            disabled={updating || !name}
            style={styles.button}
          >
            {text.update}
          </Button>
          <Button mode="text" onPress={onDismiss} style={styles.button}>
            {text.cancel}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
