import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Modal,
  Portal,
  Text,
  TextInput,
  Button,
  SegmentedButtons,
  Menu,
  HelperText,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { styles } from "@/styles/create_carousel_styles";
import { CreateCourseModalProps } from "@/types/modal";
import { SUBJECTS } from "@/utils/placeholder_subjects";

export default function CreateCourseModal({
  visible,
  onDismiss,
  onSuccess,
}: CreateCourseModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("9");
  const [subject, setSubject] = useState("math");
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return setError("Course title is required");

    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No authenticated user found");

      const { error: insertError } = await supabase.from("courses").insert({
        title,
        description,
        grade,
        subject,
        teacher_id: user.id,
      });

      if (insertError) throw insertError;

      setTitle("");
      setDescription("");
      onSuccess();
      onDismiss();
    } catch (err: any) {
      setError(err.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <ScrollView>
          <Text variant="headlineSmall" style={styles.modalTitle}>
            Create New Course
          </Text>

          <TextInput
            label="Course Title"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <Text variant="labelLarge" style={styles.label}>
            Subject
          </Text>
          <Menu
            visible={showSubjectMenu}
            onDismiss={() => setShowSubjectMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowSubjectMenu(true)}
                icon="book"
                style={styles.dropdown}
              >
                {subject.toUpperCase()}
              </Button>
            }
          >
            {SUBJECTS.map((s) => (
              <Menu.Item
                key={s}
                onPress={() => {
                  setSubject(s);
                  setShowSubjectMenu(false);
                }}
                title={s.charAt(0).toUpperCase() + s.slice(1)}
              />
            ))}
          </Menu>

          <Text variant="labelLarge" style={styles.label}>
            Grade Level
          </Text>
          <SegmentedButtons
            value={grade}
            onValueChange={setGrade}
            buttons={[
              { value: "7", label: "7" },
              { value: "8", label: "8" },
              { value: "9", label: "9" },
            ]}
            style={styles.segmented}
          />
          <SegmentedButtons
            value={grade}
            onValueChange={setGrade}
            buttons={[
              { value: "10", label: "10" },
              { value: "11", label: "11" },
              { value: "12", label: "12" },
            ]}
            style={styles.segmented}
          />

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
