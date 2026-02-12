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
  video: any | null; // null = Create Mode, object = Edit Mode
  onDismiss: () => void;
  onSuccess: () => void;
}

export default function VideoFormModal({
  visible,
  video,
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

  // Sync state with the video prop whenever the modal opens or video changes
  useEffect(() => {
    if (visible) {
      fetchCourses();
      if (video) {
        // We are in EDIT mode
        setTitle(video.title || "");
        setLink(video.link || "");
        setCourseId(video.course_id || "");
      } else {
        // We are in CREATE mode
        setTitle("");
        setLink("");
        setCourseId("");
        setCourseName("Select Course");
      }
    }
  }, [visible, video]);

  const fetchCourses = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data } = await supabase
      .from("courses")
      .select("id, title")
      .eq("teacher_id", user?.id);

    if (data) {
      setCourses(data);
      // If editing, find and set the display name of the current course
      if (video) {
        const current = data.find((c) => c.id === video.course_id);
        if (current) setCourseName(current.title);
      }
    }
  };

  const handleSave = async () => {
    if (!title || !link || !courseId) return;
    setLoading(true);

    const payload = {
      title,
      link,
      course_id: courseId,
      thumbnail: video?.thumbnail || "https://via.placeholder.com/150",
      duration: video?.duration || "10:00",
    };

    let error;
    if (video) {
      // UPDATE EXISTING
      const result = await supabase
        .from("videos")
        .update(payload)
        .eq("id", video.id);
      error = result.error;
    } else {
      // INSERT NEW
      const result = await supabase.from("videos").insert([payload]);
      error = result.error;
    }

    setLoading(false);
    if (!error) {
      onSuccess();
      onDismiss();
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
          {video ? "Edit Video" : "Upload Video"}
        </Text>

        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
        />
        <TextInput
          label="Link"
          value={link}
          onChangeText={setLink}
          mode="outlined"
        />

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button
              mode="outlined"
              onPress={() => setMenuVisible(true)}
              style={styles.dropdown}
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

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    gap: 12,
  },
  header: { marginBottom: 8, fontWeight: "bold" },
  dropdown: { marginTop: 8 },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 10,
  },
});
