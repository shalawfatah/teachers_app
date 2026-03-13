import React from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, HelperText } from "react-native-paper";
import { styles } from "@/styles/create_carousel_styles";
import { CreateCourseModalProps } from "@/types/modal";
import { useCourseCreate } from "./use-course-create";
import { CourseFormInputs } from "./course-form-inputs";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function CreateCourseModal({
  visible,
  onDismiss,
  onSuccess,
}: CreateCourseModalProps) {
  const { formData, loading, error, updateField, handleSubmit } =
    useCourseCreate(onSuccess, onDismiss);
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          <Text variant="headlineSmall" style={styles.modalTitle}>
            {text.register_new_course}
          </Text>

          <CourseFormInputs formData={formData} onFieldChange={updateField} />

          {error ? <HelperText type="error">{error}</HelperText> : null}

          <View style={styles.buttonRow}>
            <Button mode="text" onPress={onDismiss} style={styles.flexButton}>
              {text.cancel}
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={styles.flexButton}
            >
              {text.create}
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
