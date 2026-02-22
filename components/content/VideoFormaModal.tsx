import React from "react";
import { View } from "react-native";
import { Modal, Portal, Button, Text } from "react-native-paper";
import { styles } from "@/styles/video_form_modal_styles";
import { VideoFormModalProps } from "@/types/modal";
import { useVideoForm } from "./video-form-modal/use-video-form";
import { VideoFormFields } from "./video-form-modal/video-form-fields";

export default function VideoFormModal({
  visible,
  video,
  onDismiss,
  onSuccess,
}: VideoFormModalProps) {
  const {
    formData,
    courses,
    loading,
    updateField,
    handleSave,
  } = useVideoForm(visible, video, onSuccess, onDismiss);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text variant="headlineSmall" style={styles.header}>
          {video ? "Edit Video" : "Upload Video"}
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
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode="contained" onPress={handleSave} loading={loading}>
            {video ? "Update" : "Upload"}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
