import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  SegmentedButtons,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { EditStudentModalProps } from "@/types/modal";
import { styles } from "@/styles/edit_profile_student_styles";

export default function EditProfileModal({
  visible,
  onDismiss,
  profile,
  onProfileUpdate,
}: EditStudentModalProps) {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setGrade(profile.grade?.toString() || "");
    }
  }, [profile, visible]);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { error } = await supabase
        .from("students")
        .update({
          name: name,
          grade: parseInt(grade),
        })
        .eq("id", user.id);

      if (error) throw error;

      onProfileUpdate(); // Refresh the account screen
      onDismiss(); // Close modal
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        <Text variant="headlineSmall" style={styles.title}>
          نوێکردنەوەی هەژمار
        </Text>

        <TextInput
          label="ناو"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.input}
        />

        <Text variant="bodyMedium" style={styles.label}>
          پۆل
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.gradeScroll}
        >
          <SegmentedButtons
            value={grade}
            onValueChange={setGrade}
            buttons={[
              { value: "7", label: "7" },
              { value: "8", label: "8" },
              { value: "9", label: "9" },
              { value: "10", label: "10" },
              { value: "11", label: "11" },
              { value: "12", label: "12" },
            ]}
            style={styles.segment}
          />
        </ScrollView>

        <View style={styles.buttonRow}>
          <Button mode="text" onPress={onDismiss} style={styles.button}>
            رەتکردنەوە
          </Button>
          <Button
            mode="contained"
            onPress={handleUpdate}
            loading={updating}
            disabled={updating || !name}
            style={styles.button}
          >
            خەزنکردن
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
