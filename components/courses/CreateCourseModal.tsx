import React from "react";
import { View, ScrollView } from "react-native";
import { Modal, Portal, Text, Button, HelperText } from "react-native-paper";
import { styles } from "@/styles/create_carousel_styles";
import { CreateCourseModalProps } from "@/types/modal";
import { useCourseCreate } from "./use-course-create";
import { CourseFormInputs } from "./course-form-inputs";

export default function CreateCourseModal({
  visible,
  onDismiss,
  onSuccess,
}: CreateCourseModalProps) {
  const { formData, loading, error, updateField, handleSubmit } =
    useCourseCreate(onSuccess, onDismiss);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          <Text variant="headlineSmall" style={styles.modalTitle}>
            تۆمارکردنی خولی نوێ
          </Text>

          <CourseFormInputs formData={formData} onFieldChange={updateField} />

          {error ? <HelperText type="error">{error}</HelperText> : null}

          <View style={styles.buttonRow}>
            <Button mode="text" onPress={onDismiss} style={styles.flexButton}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={styles.flexButton}
            >
              Create
            </Button>
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
