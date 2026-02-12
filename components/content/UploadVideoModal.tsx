import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Modal,
  Portal,
  TextInput,
  Button,
  Text,
  Menu,
} from "react-native-paper";
import { supabase } from "@/lib/supabase";

interface Props {
  visible: boolean;
  onDismiss: () => void;
  onSuccess: () => void;
}

export default function UploadVideoModal({
  visible,
  onDismiss,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("Select Course");

  const [courses, setCourses] = useState<any[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) fetchCourses();
  }, [visible]);

  const fetchCourses = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("courses")
      .select("id, title")
      .eq("teacher_id", user?.id);

    if (data) setCourses(data);
  };

  const handleUpload = async () => {
    if (!title || !link || !courseId) return;
    setLoading(true);

    const { error } = await supabase.from("videos").insert([
      {
        title,
        link,
        course_id: courseId,
        thumbnail: "https://via.placeholder.com/150", // Default thumbnail
      },
    ]);

    setLoading(false);
    if (!error) {
      setTitle("");
      setLink("");
      setCourseId("");
      onSuccess();
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text variant="headlineSmall" style={styles.header}>
          Upload Video
        </Text>

        <TextInput
          label="Video Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="YouTube/Video Link"
          value={link}
          onChangeText={setLink}
          mode="outlined"
          placeholder="https://..."
          style={styles.input}
        />

        <View style={styles.dropdownContainer}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                style={styles.dropdownBtn}
              >
                {courseName}
              </Button>
            }
          >
            {courses.map((course) => (
              <Menu.Item
                key={course.id}
                onPress={() => {
                  setCourseId(course.id);
                  setCourseName(course.title);
                  setMenuVisible(false);
                }}
                title={course.title}
              />
            ))}
          </Menu>
        </View>

        <View style={styles.actions}>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button
            mode="contained"
            onPress={handleUpload}
            loading={loading}
            disabled={!title || !link || !courseId}
          >
            Upload
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
  },
  header: { marginBottom: 16, fontWeight: "bold" },
  input: { marginBottom: 12 },
  dropdownContainer: { marginBottom: 20 },
  dropdownBtn: { width: "100%" },
  actions: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
});
