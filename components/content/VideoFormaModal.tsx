import React from "react";
import { View } from "react-native";
import { Modal, Portal, Button, Text } from "react-native-paper";
import { styles } from "@/styles/video_form_modal_styles";
import { VideoFormModalProps } from "@/types/modal";
import { useVideoForm } from "./video-form-modal/use-video-form";
import { VideoFormFields } from "./video-form-modal/video-form-fields";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";

export default function VideoFormModal({
  visible,
  video,
  onDismiss,
  onSuccess,
}: VideoFormModalProps) {
  const { formData, courses, loading, updateField, handleSave } = useVideoForm(
    visible,
    video,
    onSuccess,
    onDismiss,
  );
  const { lang } = useLanguage();
  const text = lang === 1 ? translations.eng : translations.krd;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text variant="headlineSmall" style={styles.header}>
          {video ? text.video_update : text.upload}
        </Text>

        <VideoFormFields
          title={formData.title}
          link={formData.link}
          courseId={formData.courseId}
          courseName={formData.courseName}
          courses={courses}
          onTitleChange={(text) => updateField("title", text)}
          onLinkChange={(text) => updateField("link", text)}
          onCourseSelect={(id, name) => {
            updateField("courseId", id);
            updateField("courseName", name);
          }}
        />

        <View style={styles.actions}>
          <Button onPress={onDismiss}>رەتکردنەوە</Button>
          <Button mode="contained" onPress={handleSave} loading={loading}>
            {video ? text.update : text.upload}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
