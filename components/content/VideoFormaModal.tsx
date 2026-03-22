import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Portal, Button, Text } from "react-native-paper";
import { styles } from "@/styles/video_form_modal_styles";
import { VideoFormModalProps } from "@/types/modal";
import { useVideoForm } from "./video-form-modal/use-video-form";
import { VideoFormFields } from "./video-form-modal/video-form-fields";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/eng_krd";
import { LinearGradient } from "expo-linear-gradient";
import { gradient_colors } from "@/utils/gradient_colors";
import { BackgroundShapes } from "../backgrounds/BackgroundShapes";
import PrimaryButton from "../general/primary-button";
import SecondaryButton from "../general/secondary-button";

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
        <LinearGradient
          colors={gradient_colors}
          style={StyleSheet.absoluteFill}
        />
        <BackgroundShapes />

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
          <SecondaryButton
            text={text.cancel}
            action={onDismiss}
            icon={"cancel"}
          />
          <PrimaryButton
            text={text.update}
            action={handleSave}
            icon={"pencil"}
          />
        </View>
      </Modal>
    </Portal>
  );
}
